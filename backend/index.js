import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernProject';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const cardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  faceColor: { type: String, enum: ['purple', 'black', 'orange', 'yellow'], default: 'purple' }
});

const Card = mongoose.model('Card', cardSchema);

// Seed data if empty
async function seedData() {
  const count = await Card.countDocuments();
  if (count === 0) {
    await Card.create([
      { title: 'Modern Design', description: 'Experience the sleek and intuitive interface of our latest product.', faceColor: 'purple' },
      { title: 'Powerful Performance', description: 'Under the hood, we use cutting-edge technology to ensure speed.', faceColor: 'black' },
      { title: 'Secure & Reliable', description: 'Your data is protected with industry-leading security standards.', faceColor: 'orange' },
      { title: 'User Friendly', description: 'Built with the user in mind, making complex tasks simple and intuitive.', faceColor: 'yellow' }
    ]);
    console.log('Seed data added');
  }
}
seedData();

app.get('/api/cards', async (req, res) => {
  try {
    const cards = await Card.find().sort({ isPinned: -1, _id: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/cards/:id', async (req, res) => {
  try {
    const { isPinned, isImportant } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { isPinned, isImportant },
      { new: true }
    );
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/cards/:id', async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: 'Card deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
