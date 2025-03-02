import { Client, Databases, ID, Query } from 'appwrite';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

const client = new Client()
  .setEndpoint('http://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID); 

const databases = new Databases(client); 

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal(attribute :'searchTerm', searchTerm)]
    );
    
    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        data:{
          count: doc.count + 1,
        }
      );
    } else {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error(error);
  }
};
