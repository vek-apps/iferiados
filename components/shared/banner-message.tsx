import styles from "./banner-message.module.css";

type Props = {
  message: string;
};

function BannerMessage({ message }: Props) {
  return (
    <div className={styles.banner}>
      <p>{message}</p>
    </div>
  );
}

export default BannerMessage;
