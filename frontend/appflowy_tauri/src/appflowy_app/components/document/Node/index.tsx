import React, { useCallback } from 'react';
import { useNode } from './Node.hooks';
import { withErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryFallbackComponent } from '../_shared/ErrorBoundaryFallbackComponent';
import TextBlock from '../TextBlock';
import { NodeContext } from '../_shared/SubscribeNode.hooks';
import { BlockType } from '$app/interfaces/document';
import { Alert } from '@mui/material';

import HeadingBlock from '$app/components/document/HeadingBlock';
import TodoListBlock from '$app/components/document/TodoListBlock';
import QuoteBlock from '$app/components/document/QuoteBlock';
import BulletedListBlock from '$app/components/document/BulletedListBlock';
import NumberedListBlock from '$app/components/document/NumberedListBlock';
import ToggleListBlock from '$app/components/document/ToggleListBlock';
import DividerBlock from '$app/components/document/DividerBlock';
import CalloutBlock from '$app/components/document/CalloutBlock';

function NodeComponent({ id, ...props }: { id: string } & React.HTMLAttributes<HTMLDivElement>) {
  const { node, childIds, isSelected, ref } = useNode(id);

  const renderBlock = useCallback(() => {
    switch (node.type) {
      case BlockType.TextBlock: {
        return <TextBlock node={node} childIds={childIds} />;
      }
      case BlockType.HeadingBlock: {
        return <HeadingBlock node={node} />;
      }
      case BlockType.TodoListBlock: {
        return <TodoListBlock node={node} childIds={childIds} />;
      }
      case BlockType.QuoteBlock: {
        return <QuoteBlock node={node} childIds={childIds} />;
      }
      case BlockType.BulletedListBlock: {
        return <BulletedListBlock node={node} childIds={childIds} />;
      }
      case BlockType.NumberedListBlock: {
        return <NumberedListBlock node={node} childIds={childIds} />;
      }
      case BlockType.ToggleListBlock: {
        return <ToggleListBlock node={node} childIds={childIds} />;
      }
      case BlockType.DividerBlock: {
        return <DividerBlock />;
      }
      case BlockType.CalloutBlock: {
        return <CalloutBlock node={node} childIds={childIds} />;
      }
      default:
        return (
          <Alert severity='info' className='mb-2'>
            <p>The current version does not support this Block.</p>
          </Alert>
        );
    }
  }, [node, childIds]);

  if (!node) return null;

  return (
    <NodeContext.Provider value={node}>
      <div {...props} ref={ref} data-block-id={node.id} className={`relative ${props.className}`}>
        {renderBlock()}
        <div className='block-overlay' />
        {isSelected ? (
          <div className='pointer-events-none absolute inset-0 z-[-1] m-[1px] rounded-[4px] bg-[#E0F8FF]' />
        ) : null}
      </div>
    </NodeContext.Provider>
  );
}

const NodeWithErrorBoundary = withErrorBoundary(NodeComponent, {
  FallbackComponent: ErrorBoundaryFallbackComponent,
});

export default React.memo(NodeWithErrorBoundary);