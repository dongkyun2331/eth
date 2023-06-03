import { Link } from "react-router-dom";

function Community() {
  return (
    <div className="community">
      <div className="write">
        <Link to={"/write"}>
          <a href="#">Write</a>
        </Link>
      </div>
    </div>
  );
}

export default Community;
