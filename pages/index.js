import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

const packageNames = [
  '@thirdweb-dev/sdk',
  '@thirdweb-dev/auth',
  '@thirdweb-dev/storage',
  '@thirdweb-dev/wallets',
  '@thirdweb-dev/react',
  '@thirdweb-dev/chains',
  '@thirdweb-dev/react-core',
  '@thirdweb-dev/react-native',
  '@thirdweb-dev/react-native-compat',
  '@paperxyz/react-client-sdk'
];

async function getLatestVersions() {
  const latestVersions = {};

  for (const packageName of packageNames) {
    try {
      const response = await axios.get(`https://registry.npmjs.org/${packageName}`);
      const latestVersion = response.data['dist-tags'].latest;
      latestVersions[packageName] = latestVersion;
    } catch (error) {
      console.error(`Error fetching latest version for ${packageName}:`, error.message);
      latestVersions[packageName] = 'N/A';
    }
  }

  return latestVersions;
}

const PackageVersionsComponent = () => {
  const [latestPackageVersions, setLatestPackageVersions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchLatestVersions = async () => {
    setIsLoading(true);
    try {
      const versions = await getLatestVersions();
      setLatestPackageVersions(versions);
    } catch (error) {
      console.error('Error fetching latest versions:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.gradientText}>thirdweb</div>
        <h2>Latest versions:</h2>
        <ul className={styles.packageList}>
          {packageNames.map(packageName => (
            <li key={packageName} className={styles.packageItem}>
              <span className={styles.packageName}>{packageName}</span>
              <span className={styles.packageVersion}>{latestPackageVersions[packageName]}</span>
            </li>
          ))}
        </ul>
        <button className={styles.button} onClick={fetchLatestVersions} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Get Latest'}
        </button>
        {isLoading && <div className={styles.spinner}></div>}
      </div>
    </div>
  );
};

export default PackageVersionsComponent;