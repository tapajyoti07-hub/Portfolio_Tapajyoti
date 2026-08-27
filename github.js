/**
 * js/github.js
 * GitHub API integration for profile and repositories
 * Uses public GitHub REST API — no authentication required.
 */

document.addEventListener('DOMContentLoaded', () => {
    initGithub();
});

function initGithub() {
    if (typeof portfolioConfig === 'undefined') return;

    const username = portfolioConfig.githubUsername;
    const connectCard = document.querySelector('.github-connect');
    const statsGrid = document.querySelector('.github-stats-grid');
    const reposGrid = document.querySelector('.github-repos-grid');

    // If username is configured, auto-fetch data
    if (username && username !== 'YOUR_GITHUB_USERNAME') {
        if (connectCard) connectCard.style.display = 'none';
        if (statsGrid) statsGrid.style.display = '';
        if (reposGrid) reposGrid.style.display = '';

        fetchGithubProfile(username);
        fetchGithubRepos(username);
    } else {
        // Enable the connect form so the user can enter a username interactively
        if (connectCard) {
            connectCard.style.display = '';
            const input = connectCard.querySelector('input');
            const button = connectCard.querySelector('button');

            if (input) input.disabled = false;
            if (button) button.disabled = false;

            if (input && button) {
                const connect = () => {
                    const val = input.value.trim();
                    if (!val) return;
                    button.textContent = 'Loading…';
                    button.disabled = true;

                    // Hide the connect card and show data grids
                    connectCard.style.display = 'none';
                    if (statsGrid) statsGrid.style.display = '';
                    if (reposGrid) reposGrid.style.display = '';

                    fetchGithubProfile(val);
                    fetchGithubRepos(val);
                };

                button.addEventListener('click', connect);
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') connect();
                });
            }
        }
    }
}

/**
 * Fetch and display GitHub Profile Stats
 */
async function fetchGithubProfile(username) {
    const cacheKey = `gh_profile_${username}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        renderProfileStats(cachedData);
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const data = await response.json();
        setCachedData(cacheKey, data);
        renderProfileStats(data);
    } catch (error) {
        console.error('Failed to fetch GitHub profile:', error);
        showGithubError('.github-stats-grid', 'Unable to load GitHub stats. Check the username or try again later.');
    }
}

/**
 * Fetch and display GitHub Repositories
 */
async function fetchGithubRepos(username) {
    const cacheKey = `gh_repos_${username}`;
    const cachedData = getCachedData(cacheKey);

    if (cachedData) {
        renderRepos(cachedData);
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`);
        if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

        const data = await response.json();
        setCachedData(cacheKey, data);
        renderRepos(data);
    } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
        showGithubError('.github-repos-grid', 'Unable to load GitHub repositories.');
    }
}

/**
 * Render Profile Stats
 */
function renderProfileStats(data) {
    const statsGrid = document.querySelector('.github-stats-grid');
    if (!statsGrid) return;

    statsGrid.style.display = '';
    statsGrid.innerHTML = `
        <div class="gh-stat-card">
            <i class="fas fa-book-open"></i>
            <div class="gh-stat-info">
                <h4>${data.public_repos ?? 0}</h4>
                <p>Public Repos</p>
            </div>
        </div>
        <div class="gh-stat-card">
            <i class="fas fa-user-friends"></i>
            <div class="gh-stat-info">
                <h4>${data.followers ?? 0}</h4>
                <p>Followers</p>
            </div>
        </div>
        <div class="gh-stat-card">
            <i class="fas fa-user-plus"></i>
            <div class="gh-stat-info">
                <h4>${data.following ?? 0}</h4>
                <p>Following</p>
            </div>
        </div>
    `;
}

/**
 * Render Repositories
 */
function renderRepos(repos) {
    const reposGrid = document.querySelector('.github-repos-grid');
    if (!reposGrid) return;

    reposGrid.style.display = '';

    if (!repos || repos.length === 0) {
        reposGrid.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:2rem;">No public repositories found.</p>';
        return;
    }

    let html = '';
    repos.forEach(repo => {
        // Truncate description
        let desc = repo.description || 'No description provided.';
        if (desc.length > 100) {
            desc = desc.substring(0, 97) + '...';
        }

        html += `
            <div class="github-repo-card">
                <div class="repo-header">
                    <i class="far fa-folder repo-icon"></i>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">${repo.name}</a>
                </div>
                <p class="repo-description">${desc}</p>
                <div class="repo-meta">
                    ${repo.language ? `<span class="repo-lang"><span class="lang-dot"></span>${repo.language}</span>` : ''}
                    <span class="repo-stars"><i class="far fa-star"></i> ${repo.stargazers_count}</span>
                    <span class="repo-forks"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
            </div>
        `;
    });

    reposGrid.innerHTML = html;
}

/**
 * Show error fallback UI
 */
function showGithubError(selector, message) {
    const container = document.querySelector(selector);
    if (container) {
        container.style.display = '';
        container.innerHTML = `<div class="github-error"><p><i class="fas fa-exclamation-circle"></i> ${message}</p></div>`;
    }
}

/**
 * Caching Utilities (10 minute expiry)
 */
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes in ms

function getCachedData(key) {
    try {
        const itemStr = sessionStorage.getItem(key);
        if (!itemStr) return null;

        const item = JSON.parse(itemStr);
        const now = new Date().getTime();

        if (now > item.expiry) {
            sessionStorage.removeItem(key);
            return null;
        }
        return item.value;
    } catch (e) {
        return null;
    }
}

function setCachedData(key, value) {
    try {
        const now = new Date().getTime();
        const item = {
            value: value,
            expiry: now + CACHE_EXPIRY
        };
        sessionStorage.setItem(key, JSON.stringify(item));
    } catch (e) {
        console.warn('Failed to cache GitHub data to sessionStorage');
    }
}
