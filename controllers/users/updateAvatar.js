const { User } = require('../../models/users')
const path = require('path')
const fs = require('fs/promises')

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file
  console.log(originalname)
  const id = req.user._id
  try {
    const resultUpload = path.join(
      __dirname,
      '../../',
      'public',
      'avatars',
      originalname,
    )
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join('public', 'avatars', `${id}_${originalname}`)
    await User.findByIdAndUpdate(id, { avatarURL })
    res.json({ avatarURL })
  } catch (error) {
    await fs.unlink(tempUpload)
    throw error
  }
}

module.exports = updateAvatar
