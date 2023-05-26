import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  return (
    <div className="goal">
      <h2>{goal.text}</h2>      
      {console.log("createdAt:", goal.createdAt)}
      <h3>{new Date(goal.createdAt).toLocaleString('en-US')}</h3>
      <button onClick={() => dispatch(deleteGoal(goal.id))} className="close">
        <FaTimes />
      </button>
    </div>
  );
}

export default GoalItem;
