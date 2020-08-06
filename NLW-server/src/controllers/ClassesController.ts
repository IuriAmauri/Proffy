import convertHourToMinutes from "../utils/convertHoursToMinutes";
import db from "../database/connection";
import { Request, Response } from "express";

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async index (request: Request, response: Response) {
        const filters = request.query;
        
        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!week_day || !subject || !time) {
            return response.status(400).json({
                error: "Missing filters to search for classes"
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        response.json(classes);
    }

    async create (request: Request, response: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedUserId = await trx('users')
            .insert({
                name,
                avatar,
                whatsapp,
                bio
            });
    
            var user_Id = insertedUserId[0];
    
            const insertedClassId = await trx('classes')
                .insert({
                    subject,
                    cost,
                    user_Id
                });
    
            var class_id = insertedClassId[0];
    
            const class_schedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to)
                };
            });
    
            await trx('class_schedule')
                .insert(class_schedule);
    
            await trx.commit();
        } catch (error) {
            trx.rollback();
    
            return response.status(400).json({
                error: "Unexpected error while creating a new class" + error,
            });
        }
        
        return response.status(201).send();
    }
}