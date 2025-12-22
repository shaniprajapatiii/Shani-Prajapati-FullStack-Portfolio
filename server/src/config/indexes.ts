// Add this to server/src/config/db.ts after MongoDB connection
// Creates indexes to speed up admin dashboard queries

export const createIndexes = async () => {
  try {
    // Skills index
    await require('../models/Skill').default.collection.createIndex({ order: 1 });
    
    // Projects index
    await require('../models/Project').default.collection.createIndex({ createdAt: -1 });
    
    // Experience index
    await require('../models/Experience').default.collection.createIndex({ startDate: -1 });
    
    // Certificates index
    await require('../models/Certificate').default.collection.createIndex({ issueDate: -1 });
    
    console.log('[DB] Indexes created successfully');
  } catch (error) {
    console.error('[DB] Index creation error:', error);
  }
};
