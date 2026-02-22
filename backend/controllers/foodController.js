// import foodModel from "../models/foodModel.js";
// import fs from 'fs'

// const addFood = async (req, res) => {

//  let image_filename = `${req.file.filename}`;

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename,
//   });
//   try {
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };


// const listFood = async (req,res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({success:true,data:foods})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})   
//     }
// }

// const removeFood = async (req,res) => {
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`, ()=>{})

//         await foodModel.findByIdAndDelete(req.body.id)
//         res.json({success:true,message:"Food Removed"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }
// }


// export { addFood, listFood, removeFood };



















import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
  let image_filename;
  if (req.file) {
    image_filename = `${req.file.filename}`;
  } else {
    image_filename = req.body.imageUrl;
  }

  // When adding new item → give it the highest current order + 1
  const highestOrderItem = await foodModel.findOne().sort({ order: -1 });
  const nextOrder = highestOrderItem ? highestOrderItem.order + 1 : 1;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
    order: nextOrder,           // ← NEW
  });

  try {
    await food.save();
    res.json({ success: true, message: "Device Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({}).sort({ order: 1 }); // ← sort by order ASC
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food.image && !food.image.startsWith('http')) {
      fs.unlink(`uploads/${food.image}`, () => {});
    }
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Device Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id, name, description, price, category, imageUrl } = req.body;
    const food = await foodModel.findById(id);
    if (!food) {
      return res.json({ success: false, message: "Device not found" });
    }

    let image_filename = food.image;
    if (req.file) {
      if (food.image && !food.image.startsWith('http')) {
        fs.unlink(`uploads/${food.image}`, () => {});
      }
      image_filename = req.file.filename;
    } else if (imageUrl) {
      if (food.image && !food.image.startsWith('http')) {
        fs.unlink(`uploads/${food.image}`, () => {});
      }
      image_filename = imageUrl;
    }

    await foodModel.findByIdAndUpdate(id, {
      name: name || food.name,
      description: description || food.description,
      price: price || food.price,
      category: category || food.category,
      image: image_filename,
    });

    res.json({ success: true, message: "Device Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// NEW: Change order (move up / down)
const changeOrder = async (req, res) => {
  const { id, direction } = req.body; // direction: "up" or "down"

  try {
    const current = await foodModel.findById(id);
    if (!current) {
      return res.json({ success: false, message: "Item not found" });
    }

    let query, sortDir;
    if (direction === "up") {
      query = { order: { $lt: current.order } };
      sortDir = -1; // get the closest higher order (previous item)
    } else {
      query = { order: { $gt: current.order } };
      sortDir = 1; // get the closest lower order (next item)
    }

    const neighbor = await foodModel
      .findOne(query)
      .sort({ order: sortDir });

    if (!neighbor) {
      return res.json({ success: false, message: "Cannot move further" });
    }

    // Swap order values
    await foodModel.findByIdAndUpdate(current._id,   { order: neighbor.order });
    await foodModel.findByIdAndUpdate(neighbor._id, { order: current.order });

    res.json({ success: true, message: "Order updated" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Server error" });
  }
};

export { addFood, listFood, removeFood, updateFood, changeOrder };








// export { addFood, listFood, removeFood };

















// just for testing without image, data is send on mongo or not
// import foodModel from "../models/foodModel.js";

// const addFood = async (req, res) => {
  // If file is uploaded → use it, otherwise set a default or leave empty
//   const image_filename = req.file ? req.file.filename : "default-food.jpg";  
  // ↑ You can also use null or "" if you prefer

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
    // image: image_filename,        // this will be "default-food.jpg" when no image
//   });

//   try {
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { addFood };