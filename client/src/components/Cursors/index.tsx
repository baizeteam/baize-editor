import { useRemoteCursorOverlayPositions } from "@slate-yjs/react";
import { Fragment, useMemo, useRef } from "react";
import { useCollabSession } from "../editor/CollabSessionContext";
import "./index.less";

export function Cursors({ children }) {
  const containerRef = useRef(null);
  const [cursors] = useRemoteCursorOverlayPositions({ containerRef });
  const { collabEnabled } = useCollabSession();

  const visibleCursors = useMemo(() => {
    if (collabEnabled) return cursors;
    return cursors.filter((c) => c.data?.sessionRole !== "guest");
  }, [cursors, collabEnabled]);

  return (
    <div className="cursors" ref={containerRef}>
      {children}
      {visibleCursors.map((cursor) => (
        <Fragment key={cursor.clientId}>
          <Selection
            data={cursor.data}
            selectionRects={cursor.selectionRects}
            caretPosition={cursor.caretPosition}
          />
        </Fragment>
      ))}
    </div>
  );
}

function Selection({ data, selectionRects, caretPosition }) {
  if (!data) {
    return null;
  }

  const selectionStyle = {
    backgroundColor: data.color,
  };

  return (
    <>
      {selectionRects.map((position, i) => (
        <div
          style={{ ...selectionStyle, ...position }}
          className="selection"
          key={i}
        />
      ))}
      {caretPosition && <Caret caretPosition={caretPosition} data={data} />}
    </>
  );
}

function Caret({ caretPosition, data }) {
  const caretStyle = {
    ...caretPosition,
    background: data?.color,
  };

  const labelStyle = {
    transform: "translateY(-100%)",
    background: data?.color,
  };

  return (
    <div style={caretStyle} className="caretMarker">
      <div className="caret" style={labelStyle}>
        {data?.name}
      </div>
    </div>
  );
}
