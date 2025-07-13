import { useState } from "react";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, where, query, limit } from "@firebase/firestore";
import { app } from "./firebaseConfig";

const useFirebaseCollection = (collectionName) => {
  const [items, setItems] = useState([]);
  const [similarItems, setSimilarItems] = useState([]);
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState([]);
  const [item, setItem] = useState({});
  const [rates, setRates] = useState({});

  const db = getFirestore(app);

  const loadLatestRates = async () => {
    const docRef = doc(db, collectionName, "latestRates");
    try {
      const docSnap = await getDoc(docRef);
      if(docSnap.exists()) {
          //console.log(docSnap.data());
          setRates(docSnap.data());
      }
    } catch(error) {
        console.log(error);
    }
    
  };

  const loadAgents = async () => {
    const querySnapshot = await getDocs(collection(db, "agents"));
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAgents(localItems);
  };

  const loadAgent = async (by, value) => {
    const q = query(collection(db, "agents"), where(by, "==", value), limit(1));
    const querySnapshot = await getDocs(q);
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAgent(localItems[0]);
  };

  const loadItems = async () => {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const withoutDisabledItems = localItems.filter(item => !item.isDisabled);
    if (collectionName === "developments" || collectionName === "neighborhoods") setItems(withoutDisabledItems.filter(item => item.title !== "general"));
    else setItems(withoutDisabledItems);
  };

  const loadItemsWhereX = async (field, value) => {
    const q = query(collection(db, collectionName), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(localItems.filter(item => item.isDisabled === false));
  };

  const loadSimilarItems = async (type, refId) => {
    const q = query(collection(db, collectionName), where("propertyType", "==", type), where("isDisabled", "==", false), limit(4));
    const querySnapshot = await getDocs(q);
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSimilarItems(localItems.filter(item => item.id !== refId).slice(0,3));
  };

  const loadApartments = async () => {
    const q = query(collection(db, collectionName), where("propertyType", "==", "apartment"), where("isDisabled", "==", false), limit(18));
    const querySnapshot = await getDocs(q);
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(localItems);
  };

  const loadVillas = async () => {
    const q = query(collection(db, collectionName), where("propertyType", "==", "villa"), where("isDisabled", "==", false), limit(18));
    const querySnapshot = await getDocs(q);
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(localItems);
  };

  const loadArticles = async () => {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    const localItems = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setItems(localItems.filter(x => !x.isDisabled));
  };


  const addItem = async (item) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), item);
      setItems([...items, { ...item, id: docRef.id }]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const updateItem = async (item) => {
    try {
      await updateDoc(doc(collection(db, collectionName), item.id), item);
      setItems(items.map((i) => (i.id === item.id ? item : i)));
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(collection(db, collectionName), id));
      setItems(items.filter((i) => i.id !== id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const getItem = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      setItem(docSnap.data());
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };

  const getItemById = async (id) => {
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      setItem(docSnap.data());
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };

  const getItembyReference = async (reference) => {
    try {
      const q = query(collection(db, collectionName), where("reference", "==", reference), limit(1))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setItem(doc.data());
      });
      
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };

  const getItemByFieldValue = async (field, value) => {
    try {
      const q = query(collection(db, collectionName), where(field, "==", value), limit(1))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setItem(doc.data());
      });
      
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  };

  return { items, similarItems, loadSimilarItems, agents, loadAgents, loadItems, loadItemsWhereX, agent, loadAgent, loadApartments, loadArticles, loadVillas, item, getItem, getItemById, getItembyReference, getItemByFieldValue, addItem, updateItem, deleteItem, rates, loadLatestRates, };
};

export default useFirebaseCollection;
