export default function FriendDropdown({
  visibility,
  nickname,
}: {
  visibility: boolean;
  nickname: string;
}) {
  return (
    <div>
      <div>{visibility ? nickname : null}</div>
    </div>
  );
}
