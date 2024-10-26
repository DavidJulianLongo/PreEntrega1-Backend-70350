const validateProduct = (req, res, next) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (title === undefined || description === undefined || code === undefined || 
        price === undefined || stock === undefined || category === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validación de tipos
    if (typeof title !== 'string') return res.status(400).json({ message: 'The title must be a string' });
    if (typeof description !== 'string') return res.status(400).json({ message: 'The description must be a string' });
    if (typeof code !== 'string') return res.status(400).json({ message: 'The code must be a string' });
    if (typeof price !== 'number') return res.status(400).json({ message: 'The price must be a number' });
    if (typeof stock !== 'number') return res.status(400).json({ message: 'The stock must be a number' });
    if (typeof category !== 'string') return res.status(400).json({ message: 'The category must be a string' });
    
    next();
};

export default validateProduct;