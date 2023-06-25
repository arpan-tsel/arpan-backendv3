// Authentication
// function : 
//  - login
//  - logout

import { Request, Response } from "express";
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import useraccount from '../models/useraccount'

//login function
export const loginAccount = async (req: Request, res: Response) => {
    try {
        const user = await useraccount.findOne({
            where: {
                username: req.body.username
            }
        });
        const validPassword = await bcrypt.compare(
            req.body.password,
            user!.password
        );

        if (!validPassword) return res.status(400).json({ msg: "Wrong Password!" });

        //variable
        const userId = user!.id;
        const uuid = user!.uuid;
        const name = user!.name;
        const role = user!.role;
        const username = user!.username;

        // console.log(uuid)

        const accessToken = jwt.sign({ userId, uuid, name, username, role }, process.env.ACCESS_TOKEN_SECRET as string, {
            expiresIn: '45s'
        });
        const refreshToken = jwt.sign({ userId, uuid, name, username, role }, process.env.REFRESH_TOKEN_SECRET as string, {
            expiresIn: '2d'
        });
        await useraccount.update({ refreshToken: refreshToken }, { //input to db, update berdasarkan uuid
            where: {
                uuid: uuid
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({ accessToken });

    } catch (error) {
        res.status(404).json({ msg: "User Not Found!" });
        console.log(error);
    }
}

//logout function
export const logoutAccount = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204); //jika tidak ada token -> 204 (no content)
    const user = await useraccount.findAll({
        where: {
            refreshToken: refreshToken          //match token?
        }
    });
    if (!user) return res.sendStatus(204);
    const uuid = user[0].dataValues.uuid;

    //update refresh token and set to null
    await useraccount.update({ refreshToken: null }, {
        where: {
            uuid: uuid
        }
    });

    // when refreshToken in db becomes null, then cookie is deleted
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}