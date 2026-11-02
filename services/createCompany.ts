
import { db, auth } from '../lib/firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

export const createCompany = async (companyName: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('You must be logged in.');
  }

  if (!companyName.trim()) {
    throw new Error('Company name is required.');
  }

  try {
    const docRef = await addDoc(collection(db, 'companies'), {
      name: companyName.trim(),
      ownerId: user.uid,
      createdAt: serverTimestamp(),
    });

    return {
      success: true,
      companyId: docRef.id,
      message: 'Company created successfully',
    };
  } catch (error) {
    console.error('Error creating company:', error);
    throw error;
  }
};
