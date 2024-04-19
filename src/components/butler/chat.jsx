import MediaQuery from "react-responsive";

export function Chat() {
  return (
    <div>
      <MediaQuery minWidth={1024}>웹페이지</MediaQuery>
      <MediaQuery maxWidth={1023} minWidth={768}>
        태블릿
      </MediaQuery>
      <MediaQuery maxWidth={767}>모바일</MediaQuery>
    </div>
  );
}
