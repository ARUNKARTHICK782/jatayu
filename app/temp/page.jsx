"use client";

import React, { useState, useEffect } from 'react';
import GithubAPI from './GithubAPI';
import './App.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState([]);
  const [repoLanguages, setRepoLanguages] = useState({});
  const [chartData, setChartData] = useState({});
  const [showGraph, setShowGraph] = useState(0);
  const [errorText, setErrorText] = useState("Please Search an Username");

  useEffect(() => {
    const countLanguages = () => {
      const languages = {};

      for (const repo of repos) {
        const repoName = repo.name;
        const repoLangs = repoLanguages[repoName];

        if (repoLangs) {
          for (const lang of Object.keys(repoLangs)) {
            if (languages[lang]) {
              languages[lang] += repoLangs[lang];
            } else {
              languages[lang] = repoLangs[lang];
            }
          }
        }
      }

      const sortedLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      return sortedLanguages;
    };

    const sortedLanguages = countLanguages();

    const languageLabels = Object.keys(sortedLanguages);
    const languageData = Object.values(sortedLanguages);

    setChartData({
      labels: languageLabels,
      datasets: [
        {
          label: 'Language',
          data: languageData,
          backgroundColor: 'rgba(0, 123, 255, 0.8)',
        },
      ],
    });
    
  }, [repos, repoLanguages]);

  const fetchRepos = async () => {
    if (username) {
      try {
        const repositories = await GithubAPI.getRepos(username);
        if(!repositories.length) setErrorText('No Repo Found for the User')
        else if(repositories==="error") setErrorText('Enter Valid UserName')
        else{
          setRepos(repositories);
          setShowGraph(1);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    }
  };


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const fetchRepoLanguages = async (owner, repo) => {
    try {
      const languages = await GithubAPI.getRepoLanguages(owner, repo);
      setRepoLanguages((prevRepoLanguages) => ({
        ...prevRepoLanguages,
        [repo]: languages,
      }));
    } catch (error) {
      console.error('Error fetching repository languages:', error);
    }
  };

  
  return (
    <div className="container">
      <div>
        <h1 className="title">Github Tech Stack</h1>
        <div className="input-container">
          <label htmlFor="username" className="input-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            value={username}
            onChange={handleUsernameChange}
            onKeyUp={(event) => {
              if(event.key === 'Enter') fetchRepos()
            }}
          />
          <h6 style={{color:'red'}}>{errorText}</h6>
        </div>
        <div className="repo-container">
          {repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h2 className="repo-name">{repo.name}</h2>
              {repoLanguages[repo.name] ? (
                <ul className="language-list">
                  {Object.keys(repoLanguages[repo.name]).map((language) => (
                    <li key={language} className="language-item">
                      {language}
                    </li>
                  ))}
                </ul>
              ) : (
                <button
                  className="fetch-button"
                  onClick={() => fetchRepoLanguages(repo.owner.login, repo.name)}
                >
                  Fetch Tech Stack
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {Object.keys(chartData).length && showGraph ? 
      <div className="chart-container">
    <div className="sticky-chart">
      <h2 className="chart-title">Most Used Languages</h2>
     <Bar data={chartData} height={window.screen.width >= 1200?500:200} width={window.screen.width >= 1200?500:200}/>
    </div>
  </div>
  : null}
  </div>
  );
};

export default App;
