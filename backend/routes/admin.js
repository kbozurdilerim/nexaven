import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database.js';
import { authorizeAdmin } from '../middleware/auth.js';

const router = express.Router();
const db = getDatabase();

// Check if user is admin
router.use(authorizeAdmin);

// ============ SERVICES MANAGEMENT ============

// Get all services
router.get('/services', async (req, res) => {
  try {
    const services = await db.all('SELECT * FROM services ORDER BY order_num ASC');
    res.json(services || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Create service
router.post('/services', async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const id = uuidv4();

    await db.run(
      'INSERT INTO services (id, title, description, icon) VALUES (?, ?, ?, ?)',
      [id, title, description || '', icon || 'star']
    );

    res.status(201).json({ 
      id, 
      title, 
      description: description || '', 
      icon: icon || 'star',
      is_active: 1
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Update service
router.put('/services/:id', async (req, res) => {
  try {
    const { title, description, icon, is_active } = req.body;
    
    await db.run(
      'UPDATE services SET title = ?, description = ?, icon = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, icon, is_active, req.params.id]
    );

    res.json({ message: 'Service updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
router.delete('/services/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM services WHERE id = ?', [req.params.id]);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// ============ ABOUT PAGE MANAGEMENT ============

// Get about
router.get('/about', async (req, res) => {
  try {
    const about = await db.get('SELECT * FROM about LIMIT 1');
    res.json(about || {
      id: uuidv4(),
      title: 'About Us',
      content: '',
      vision: '',
      mission: ''
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch about' });
  }
});

// Update about
router.put('/about', async (req, res) => {
  try {
    const { title, content, vision, mission } = req.body;
    const about = await db.get('SELECT * FROM about LIMIT 1');

    if (about) {
      await db.run(
        'UPDATE about SET title = ?, content = ?, vision = ?, mission = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [title, content, vision, mission, about.id]
      );
    } else {
      const id = uuidv4();
      await db.run(
        'INSERT INTO about (id, title, content, vision, mission) VALUES (?, ?, ?, ?, ?)',
        [id, title, content, vision, mission]
      );
    }

    res.json({ message: 'About page updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update about' });
  }
});

// ============ PAGES MANAGEMENT ============

// Get all pages
router.get('/pages', async (req, res) => {
  try {
    const pages = await db.all('SELECT * FROM pages ORDER BY order_num ASC');
    res.json(pages || []);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pages' });
  }
});

// Create page
router.post('/pages', async (req, res) => {
  try {
    const { title, slug, content, type } = req.body;
    const id = uuidv4();

    await db.run(
      'INSERT INTO pages (id, title, slug, content, type) VALUES (?, ?, ?, ?, ?)',
      [id, title, slug, content || '', type || 'custom']
    );

    res.status(201).json({ 
      id, 
      title, 
      slug,
      content: content || '', 
      type: type || 'custom',
      is_published: 1
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create page' });
  }
});

// Update page
router.put('/pages/:id', async (req, res) => {
  try {
    const { title, slug, content, type, is_published } = req.body;
    
    await db.run(
      'UPDATE pages SET title = ?, slug = ?, content = ?, type = ?, is_published = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, slug, content, type, is_published, req.params.id]
    );

    res.json({ message: 'Page updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update page' });
  }
});

// Delete page
router.delete('/pages/:id', async (req, res) => {
  try {
    await db.run('DELETE FROM pages WHERE id = ?', [req.params.id]);
    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete page' });
  }
});

// ============ DASHBOARD ============

router.get('/dashboard', async (req, res) => {
  try {
    const totalServices = await db.get('SELECT COUNT(*) as count FROM services');
    const totalUsers = await db.get('SELECT COUNT(*) as count FROM users');
    const totalPages = await db.get('SELECT COUNT(*) as count FROM pages');

    res.json({
      totalServices: totalServices?.count || 0,
      totalUsers: totalUsers?.count || 0,
      totalPages: totalPages?.count || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router;
