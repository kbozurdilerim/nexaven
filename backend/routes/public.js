import express from 'express';
import { getDatabase } from '../database.js';

const router = express.Router();
const db = getDatabase();

// Get about page
router.get('/about', async (req, res) => {
  try {
    const about = await db.get('SELECT * FROM about LIMIT 1');
    res.json(about || { 
      title: 'About Us',
      content: 'Welcome to Nexaven',
      vision: '',
      mission: ''
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about content' });
  }
});

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await db.all(
      'SELECT * FROM services WHERE is_active = 1 ORDER BY order_num ASC'
    );
    res.json(services || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Get page by slug
router.get('/pages/:slug', async (req, res) => {
  try {
    const page = await db.get(
      'SELECT * FROM pages WHERE slug = ? AND is_published = 1',
      [req.params.slug]
    );
    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }
    res.json(page);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch page' });
  }
});

// Get all published pages
router.get('/pages', async (req, res) => {
  try {
    const pages = await db.all(
      'SELECT * FROM pages WHERE is_published = 1 ORDER BY order_num ASC'
    );
    res.json(pages || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

export default router;
