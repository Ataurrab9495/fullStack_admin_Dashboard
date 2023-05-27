import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from 'country-iso-2-to-3'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    /* below we are communicating with other documents with other document */

    const productWithStats = await Promise.all(
      products.map(async (product) => {
        const productStat = await ProductStat.find({
          productId: product._id
        })
        return ({
          ...product._doc,
          productStat
        })
      })
    );

    res.status(200).json(productWithStats);

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}



export const getCreators = async (req, res) => {
  try {
    const creators = await User.find({ role: 'user' }).select("-password");
    /* .select method is used to select something from database that we do not want to show in frontend.
    ex:- as we see above we used .select("-password") means when data will fetch from database password will not be considered  */
    res.status(200).json(creators);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}




export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 100, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};





export const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {})
  
  

    const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
      return { id: country, value: count }
    });

    res.status(200).json(formattedLocations);

  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
