import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";
import Profile from "../models/validateUser.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getDashboard = async (req, res) => {
    try {
        //hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";

        // Recent Transactions
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });

        // OverallStat
        const overallStat = await OverallStat.find({ year: currentYear });

        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
        } = overallStat[0];

        const thisMonthStats = overallStat[0].monthlyData.find((month) => {
            return month === currentMonth;
        })

        const todayStats = overallStat[0].dailyData.find((date) => {
            return date === currentDay;
        })


        res.status(200).json({
            totalCustomers,
            yearlySalesTotal,
            yearlyTotalSoldUnits,
            monthlyData,
            salesByCategory,
            transactions,
            thisMonthStats,
            todayStats,
        })
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


/* creating the users */

export const getProfile = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {
       const existingUser = await Profile.findOne({email});
       if(existingUser) return res.status(404).json({message: "user already exists."})

       if(password === confirmPassword) return res.status(404).json({message: "password don't match."})

       const hashedPassword = await bcrypt.hash(password, 12);

       const result = await Profile.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

       res.status(200).json({result})


    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})


/* geting the login details */

export const getLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Profile.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(404)
            throw new Error("Invalid Credentials")
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})