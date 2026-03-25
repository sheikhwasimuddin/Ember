import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPxhFESy2L2Ih781YbkxjkMA_L6BwrrhM",
  authDomain: "ember-ec39a.firebaseapp.com",
  projectId: "ember-ec39a",
  storageBucket: "ember-ec39a.firebasestorage.app",
  messagingSenderId: "66896043700",
  appId: "1:66896043700:web:8027fb2b1a1a05d35b81e1",
  measurementId: "G-3HVLLWYF1E"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Set up persistence
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence setup error:", error);
});

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Auth utility functions
export const authFunctions = {
  // Sign up with email and password
  signUpWithEmail: async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  // Sign in with email and password
  signInWithEmail: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  // Sign in with Google
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { user: result.user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  },

  // Sign out
  logout: async () => {
    try {
      await signOut(auth);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  },

  // Send password reset email
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  }
};

// Firestore utility functions
export const firestoreFunctions = {
  // Create user profile
  createUserProfile: async (userId, userData) => {
    try {
      await setDoc(doc(db, "users", userId), {
        ...userData,
        createdAt: serverTimestamp(),
        lastActivity: serverTimestamp()
      });
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  },

  // Get user profile
  getUserProfile: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, "users", userId));
      if (userDoc.exists()) {
        return { data: userDoc.data(), error: null };
      } else {
        return { data: null, error: "User profile not found" };
      }
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Update user profile
  updateUserProfile: async (userId, updateData) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        ...updateData,
        lastActivity: serverTimestamp()
      });
      return { error: null };
    } catch (error) {
      return { error: error.message };
    }
  },

  // Add mood entry
  addMoodEntry: async (userId, moodData) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "moodEntries"), {
        ...moodData,
        timestamp: serverTimestamp()
      });
      return { docId: docRef.id, error: null };
    } catch (error) {
      return { docId: null, error: error.message };
    }
  },

  // Get mood entries for user
  getMoodEntries: async (userId) => {
    try {
      const entriesQuery = query(collection(db, "users", userId, "moodEntries"));
      const querySnapshot = await getDocs(entriesQuery);
      const entries = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { data: entries, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Add community post
  addCommunityPost: async (userId, postData) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "communityPosts"), {
        ...postData,
        timestamp: serverTimestamp()
      });
      return { docId: docRef.id, error: null };
    } catch (error) {
      return { docId: null, error: error.message };
    }
  },

  // Get community posts for user
  getCommunityPosts: async (userId) => {
    try {
      const postsQuery = query(collection(db, "users", userId, "communityPosts"));
      const querySnapshot = await getDocs(postsQuery);
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return { data: posts, error: null };
    } catch (error) {
      return { data: null, error: error.message };
    }
  },

  // Add bookmark
  addBookmark: async (userId, bookmarkData) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "bookmarks"), {
        ...bookmarkData,
        savedAt: serverTimestamp()
      });
      return { docId: docRef.id, error: null };
    } catch (error) {
      return { docId: null, error: error.message };
    }
  }
};

export default app;