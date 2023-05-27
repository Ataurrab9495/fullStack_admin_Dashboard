import mongoose from 'mongoose';

const AffiliateStatSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",   // this ref indicates the database from where i want to get the data or which dataModel it is referring to
        },
        affiliateSales: {
            type: [
                mongoose.Types.ObjectId,
            ],
            ref: "Transaction", // this ref indicates the database from where i want to get the data
        },
    },
    { timestamps: true },
);


const AffiliateStat = mongoose.model('AffiliateStat', AffiliateStatSchema);

export default AffiliateStat;