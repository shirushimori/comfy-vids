class PlayerApp {
    constructor() {
        this.videos = [];
        this.currentVideo = null;
        this.currentSeason = 1;
    }

    async init() {
        this.videos = await SharedData.loadVideos();
        const videoId = SharedData.getSelectedVideoId();
        
        if (videoId) {
            const video = this.videos.find(v => v.id == videoId);
            if (video) {
                this.currentVideo = video;
                this.currentSeason = parseInt(SharedData.getSelectedSeason()) || 1;
                this.renderPlayer();
                this.renderEpisodeNavigation();
            }
        }

        this.setupEventListeners();
        SharedData.setupContextMenu();
    }

    setupEventListeners() {
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'home.html';
            });
        }

        const seasonSelect = document.getElementById('seasonSelect');
        if (seasonSelect) {
            seasonSelect.addEventListener('change', (e) => {
                this.currentSeason = parseInt(e.target.value);
                SharedData.setSelectedSeason(this.currentSeason);
                this.renderEpisodeList();
                this.setupEpisodeSearch();
            });
        }

        const episodeSearch = document.getElementById('episodeSearch');
        if (episodeSearch) {
            episodeSearch.addEventListener('input', () => {
                this.setupEpisodeSearch();
            });
        }
    }

    renderPlayer() {
        if (!this.currentVideo) return;

        const season = this.currentVideo.seasons.find(s => s.season === this.currentSeason);
        if (!season || !season.episodes || season.episodes.length === 0) return;

        const episode = season.episodes[0];
        
        // Render video iframe
        const wrapper = document.getElementById('videoIframeWrapper');
        if (wrapper && episode['video-iframe']) {
            wrapper.innerHTML = episode['video-iframe'];
        }

        // Render video info
        document.getElementById('videoTitle').textContent = this.currentVideo.title;
        document.getElementById('videoAuthor').textContent = this.currentVideo.author;
        document.getElementById('videoDate').textContent = SharedData.formatDate(this.currentVideo['date-time']);
        document.getElementById('videoDescription').textContent = this.currentVideo.description;
    }

    renderEpisodeNavigation() {
        if (!this.currentVideo) return;

        this.renderSeasonSelect();
        this.renderEpisodeList();
        this.setupEpisodeSearch();
    }

    renderSeasonSelect() {
        const select = document.getElementById('seasonSelect');
        if (!select) return;

        select.innerHTML = '';
        this.currentVideo.seasons.forEach(season => {
            const option = document.createElement('option');
            option.value = season.season;
            option.textContent = `Season ${season.season}`;
            if (season.season === this.currentSeason) {
                option.selected = true;
            }
            select.appendChild(option);
        });
    }

    renderEpisodeList() {
        const episodeList = document.getElementById('episodeList');
        if (!episodeList || !this.currentVideo) return;

        const season = this.currentVideo.seasons.find(s => s.season === this.currentSeason);
        if (!season || !season.episodes) {
            episodeList.innerHTML = '<p style="padding: 12px; color: var(--text-secondary);">No episodes found</p>';
            return;
        }

        episodeList.innerHTML = '';
        season.episodes.forEach(episode => {
            const episodeEl = document.createElement('div');
            episodeEl.className = 'episode-item';
            episodeEl.innerHTML = `
                <div class="episode-number">S${season.season}E${episode.episode}</div>
                <div class="episode-title">${episode.title || `Episode ${episode.episode}`}</div>
            `;
            episodeEl.addEventListener('click', () => {
                this.playEpisode(episode, season.season);
            });
            episodeList.appendChild(episodeEl);
        });
    }

    playEpisode(episode, season) {
        if (!episode['video-iframe']) return;

        const wrapper = document.getElementById('videoIframeWrapper');
        if (wrapper) {
            wrapper.innerHTML = episode['video-iframe'];
        }

        // Update highlighted episode
        document.querySelectorAll('.episode-item').forEach(el => {
            el.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }

    setupEpisodeSearch() {
        const searchInput = document.getElementById('episodeSearch');
        const episodeList = document.getElementById('episodeList');
        
        if (!searchInput || !episodeList) return;

        const searchTerm = searchInput.value.toLowerCase();
        const episodes = episodeList.querySelectorAll('.episode-item');

        episodes.forEach(episode => {
            const title = episode.querySelector('.episode-title').textContent.toLowerCase();
            const number = episode.querySelector('.episode-number').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || number.includes(searchTerm)) {
                episode.style.display = 'block';
            } else {
                episode.style.display = 'none';
            }
        });
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new PlayerApp();
    app.init();
});
