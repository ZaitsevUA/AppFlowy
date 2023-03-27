import { useEffect } from 'react';
import { DocumentData } from '$app/interfaces/document';
import { useAppDispatch } from '@/appflowy_app/stores/store';
import { documentActions } from '$app/stores/reducers/document/slice';

export function useParseTree(documentData: DocumentData) {
  const dispatch = useAppDispatch();
  const { blocks, meta } = documentData;

  useEffect(() => {
    dispatch(
      documentActions.create({
        nodes: blocks,
        delta: meta.text_map,
        children: meta.children_map,
      })
    );

    return () => {
      dispatch(documentActions.clear());
    };
  }, [documentData]);
}
