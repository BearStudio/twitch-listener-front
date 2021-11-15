import {
  collection,
  doc,
  getFirestore,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

import { app } from '@/firebase';

export const useGetComments = () =>
  useCollection(
    query(
      collection(getFirestore(app), 'comments'),
      orderBy('timestamp', 'asc')
    )
  );

export const useGetCommentsQuestion = () =>
  useCollection(
    query(
      collection(getFirestore(app), 'comments'),
      where('isQuestion', '==', true),
      orderBy('timestamp', 'asc')
    )
  );

export const useGetCommentLive = () =>
  useCollection(
    query(
      collection(getFirestore(app), 'comments'),
      where('isLive', '==', true)
    )
  );
