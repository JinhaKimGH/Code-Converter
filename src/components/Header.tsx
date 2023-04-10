interface HeaderProps {
  filename: string;
}

export const Header = ({filename}: HeaderProps) => {
  return (
    <div className="header" id="header">
      <div className="input-wrapper">
        <input type="text" placeholder={filename} />
      </div>
    </div>
  );
};
