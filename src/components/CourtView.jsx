import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./CourtView.css";

const CourtView = ({ activePlayers, courtLocked, rotatePlayers }) => {
  return (
    <div className="court-container">
      <h3>Volleyball Court</h3>

      {activePlayers.length === 0 && <p>No active players selected. Use the Player Manager.</p>}

      <DragDropContext>
        <Droppable droppableId="court" isDropDisabled={courtLocked}>
          {(provided) => (
            <div className="court" {...provided.droppableProps} ref={provided.innerRef}>
              <div className="net">NET</div>

              {/* Front Row (4, 3, 2) */}
              <div className="row">
                {["4", "3", "2"].map((pos, index) => (
                  <div key={pos} className="court-position">
                    {activePlayers[index] && (
                      <Draggable
                        key={activePlayers[index].id}
                        draggableId={activePlayers[index].id.toString()}
                        index={index}
                        isDragDisabled={courtLocked}
                      >
                        {(provided) => (
                          <div
                            className="player-box"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {activePlayers[index].name}
                          </div>
                        )}
                      </Draggable>
                    )}
                  </div>
                ))}
              </div>

              {/* Back Row (5, 6, 1) */}
              <div className="row">
                {["5", "6", "1"].map((pos, index) => (
                  <div key={pos} className="court-position">
                    {activePlayers[index + 3] && (
                      <Draggable
                        key={activePlayers[index + 3].id}
                        draggableId={activePlayers[index + 3].id.toString()}
                        index={index + 3}
                        isDragDisabled={courtLocked}
                      >
                        {(provided) => (
                          <div
                            className="player-box"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {activePlayers[index + 3].name}
                          </div>
                        )}
                      </Draggable>
                    )}
                  </div>
                ))}
              </div>

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button onClick={rotatePlayers}>Rotate Players</button>
    </div>
  );
};

export default CourtView;

