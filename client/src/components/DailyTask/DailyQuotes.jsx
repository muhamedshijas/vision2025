import React, { useState } from "react";
import DailyFeedbackModal from "../../modals/DailyTask/DailyFeedbackModal";
function DailyQuotes() {
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div>
        <button onClick={() => setModalOpen(true)}>Give Daily Feedback</button>
        <DailyFeedbackModal
          open={isModalOpen}
          handleClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default DailyQuotes;
