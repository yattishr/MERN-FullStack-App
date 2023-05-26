import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goal
  );

  // if User is not logged in, navigate to the Login page. Prevents unauthorized access
  useEffect(() => {
    if (isError) {
      console.log(`Error while retrieving goals: ${message}`);
    }

    if (!user) {
      navigate("/login");
    }

    // Dispatch getGoals function.
    dispatch(getGoals());

    if (isLoading) {
      return <Spinner />;
    }

    // reset the state after fetching Goals.
    return () => {
      dispatch(reset);
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal.id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You do not have any Goals </h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
