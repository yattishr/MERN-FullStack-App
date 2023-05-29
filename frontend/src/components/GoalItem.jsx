import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const createdAtDate = new Date(goal.createdAt);

  return (
    <div className="goal">
      <h2>{goal.text}</h2>
      {console.log(`logging createdAt: ${goal.createdAt}`)}

      {createdAtDate.toString() !== "Invalid Date" && (
        <h3>{createdAtDate.toLocaleString("en-US")}</h3>
      )}

      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <FaTimes />
      </button>
    </div>
  );
}

export default GoalItem;

/**
 * TO DO:
 * 1. When adding a new Goal:
 * - After hitting Submit, the new Goal Item shows as "Invalid Date"
 * - The Goal details for the new Goal do not show immediately on GoalItem
 * - FIXED: Issue was on Backend GoalController (Y.R 29 MAy 2023)
 *
 * 2. After pressing the "X" to DELETE a Goal, the Goal does not get removed from the UI
 * Although the Goal is deleted from the backend
 *
 */
