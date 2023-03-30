import styles from './styles.module.scss';
import rssLogo from '../../assets/icons/RSSLogo-icon.svg';
import gitHubLogo from '../../assets/icons/github-logo-icon.svg';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.gitHubContainer} >
                    <div className={styles.gitHubContainerItem}>
                        <img className={styles.gitHubImg} src={gitHubLogo} alt="GitHub Logo" />
                        <a className={styles.gitHubLink} href="https://github.com/iSvitka" target='_blank' rel='noreferrer'>iSvitka</a>
                    </div>
                    <div className={styles.gitHubContainerItem}>
                        <img className={styles.gitHubImg} src={gitHubLogo} alt="GitHub Logo" />
                        <a className={styles.gitHubLink} href="https://github.com/Achimenes-freeman" target='_blank' rel='noreferrer'>Achimenes-freeman</a>
                    </div>
                    <div className={styles.gitHubContainerItem}>
                        <img className={styles.gitHubImg} src={gitHubLogo} alt="GitHub Logo" />
                        <a className={styles.gitHubLink} href="https://github.com/926227" target='_blank' rel='noreferrer'>926227</a>
                    </div>
                </div>
                <h3 className={styles.heading}>OnlineStore</h3>
                <div className={styles.rssContainer}>
                    <a className={styles.rssLink} href="https://rs.school/js/" target='_blank' rel='noreferrer'>
                        <img className={styles.rssLogo} src={rssLogo} alt="RSS Logo" /> 
                    </a>
                    <span className={styles.year}>2022</span>
                </div>
            </div>
        </footer>
    )
}