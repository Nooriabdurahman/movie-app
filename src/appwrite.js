import { Client, Databases, ID, Query } from 'appwrite';

// Load environment variables
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

// Initialize Appwrite client
const client = new Client()
  .setEndpoint('http://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject(PROJECT_ID); // Your project ID

const databases = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // Check if a document with the same searchTerm already exists
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('searchTerm', searchTerm)] // Corrected syntax
    );

    if (result.documents.length > 0) {
      // If document exists, update its count
      const doc = result.documents[0];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        {
          count: doc.count + 1, // Corrected syntax
        }
      );
    } else {
      // If document doesn't exist, create a new one
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=No+Poster', // Handle null poster_path
        }
      );
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};