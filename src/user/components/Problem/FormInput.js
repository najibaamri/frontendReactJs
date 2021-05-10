import { useEffect, useRef } from "react";

export default function FormInput({ id, socket, setreply, send, name }) {
  const contentRef = useRef();
  const userconnected = localStorage.getItem("connecteduser");
  useEffect(() => {
    if (name) {
      contentRef.current.innerHTML =
        '<a href ="#!" style="color:crimson;font-weight:600; text-transform: capitalize;">' +
        name +
        ": </a>";
    }
  }, [name]);

  const commentSubmit = () => {
    const username = userconnected;
    const description = contentRef.current.innerHTML;
    if (!username.trim()) return alert("not Empty");
    if (contentRef.current.textContent.trim().length < 1) return alert("content is required ");
    const createdAt = new Date().toISOString();
    socket.emit("createComment", {
      username: userconnected,
      description,
      post_id: id,
      createdAt,
      send,
    });
    contentRef.current.innerHTML = "";
    if (setreply) setreply(false);
  };

  return (
    <div>
      <p>Post Your Comment: </p>
      <div
        ref={contentRef}
        contentEditable="true"
        style={{ height: "100px", border: "1px solid #ccc", outline: "none" }}
      ></div>
      <button onClick={commentSubmit}>Send</button>
    </div>
  );
}
