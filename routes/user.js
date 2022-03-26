const router = require('express').Router();
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');
const User = require('../model/user');

router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create instance of user
    let user = new User({
      name: req.body.name,
      avatar: result.secure_url,
      cloudinary_id: result.public_id,
    });

    // Save user
    await user.save();
    res.json(user);
  }
  catch(err) {
    console.log(err);
  }
});

router.get('/', async (req, res) => {
  try {
    let user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Find user by id
    let user = await User.findById(req.params.id);
    // delete image from cloudinary
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // delete user from db
    await user.remove();
    res.json(user);
  } catch(err) {
    console.log(err);
  }
});

router.put('/id', upload.single('image'), async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    // delete existing image
    await cloudinary.uploader.destroy(user.cloudinary_id);
    // upload new file
    const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      name: req.body.name || user.name,
      avatar: result.secure_url || user.avatar,
      cloudinary_id: result.secure_url || user.cloudinary_id
    };
    user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
  }
);

module.exports = router;