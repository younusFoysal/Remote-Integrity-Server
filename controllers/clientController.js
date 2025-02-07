import Client from '../models/Client.js';

// Get all clients
export const getClients = async (req, res) => {
    try {
        const clients = await Client.find().populate('contact_id');
        res.json(clients);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get a single client by ID
export const getClientById = async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({message: 'Client not found'});
        res.json(client);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Create a new client
export const createClient = async (req, res) => {
    try {
        const { contact_id, is_new_lead, notes } = req.body;

        const newClient = new Client({ contact_id, is_new_lead, notes });
        await newClient.save();
        res.status(201).json(newClient);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateClient = async (req, res) => {
    try {
       const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!client) return res.status(404).json({message: 'Client not found'});
       res.json(client);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


// Delete a client
export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) return res.status(404).json({message: 'Client not found'});
        res.json({message: 'Client deleted successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};




