class VideoStreamingApp {
    constructor() {
        this.videos = [];
        this.currentVideo = null;
        this.currentSeason = null;
        this.currentEpisode = null;
        this.customUrls = [];
        this.settings = {
            autoPlay: false,
            showDescriptions: true,
            selectedSources: ['mix'],
            customUrls: []
        };
        this.init();
    }

    async init() {
        this.loadSettings();
        this.setupEventListeners();
        this.setupContextMenu();
        this.setupSettings();
        await this.loadVideos();
    }

    loadSettings() {
        const saved = localStorage.getItem('comfyhub_settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
        }
        this.applySettings();
    }

    saveSettings() {
        localStorage.setItem('comfyhub_settings', JSON.stringify(this.settings));
    }

    applySettings() {
        document.getElementById('autoPlay').checked = this.settings.autoPlay;
        document.getElementById('showDescriptions').checked = this.settings.showDescriptions;
        
        const sourceCheckboxes = document.querySelectorAll('[id^="source-"]');
        sourceCheckboxes.forEach(checkbox => {
            checkbox.checked = this.settings.selectedSources.includes(checkbox.value);
        });
    }

    renderCustomUrlsList() {
        const list = document.getElementById('customUrlsList');
        if (!list) return;

        list.innerHTML = this.settings.customUrls.map((url, index) => `
            <div class="custom-url-item">
                <span class="url-text" title="${url}">${url}</span>
                <button class="remove-url-btn" data-index="${index}">Remove</button>
            </div>
        `).join('');

        document.querySelectorAll('.remove-url-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.settings.customUrls.splice(index, 1);
                this.renderCustomUrlsList();
            });
        });
    }

    setupEventListeners() {
        document.getElementById('backBtn').addEventListener('click', () => {
            this.switchView('homeView');
            document.getElementById('videoIframeWrapper').innerHTML = '';
        });
    }

    setupContextMenu() {
        const contextMenu = document.getElementById('contextMenu');

        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            contextMenu.classList.add('show');
            contextMenu.style.left = `${e.clientX}px`;
            contextMenu.style.top = `${e.clientY}px`;
        });

        document.addEventListener('click', () => {
            contextMenu.classList.remove('show');
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                contextMenu.classList.remove('show');
            }
        });

        contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                this.handleContextAction(action);
                contextMenu.classList.remove('show');
            });
        });
    }

    setupSettings() {
        const overlay = document.getElementById('settingsOverlay');
        const openBtn = document.getElementById('openSettings');
        const closeBtn = document.getElementById('closeSettings');
        const tabs = document.querySelectorAll('.settings-tab');
        const sections = document.querySelectorAll('.settings-section');
        const saveBtn = document.getElementById('saveSettings');
        const addCustomBtn = document.getElementById('addCustomBtn');

        openBtn.addEventListener('click', () => overlay.classList.add('show'));
        closeBtn.addEventListener('click', () => overlay.classList.remove('show'));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('show');
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.section).classList.add('active');
            });
        });

        const sourceCheckboxes = document.querySelectorAll('[id^="source-"]');
        sourceCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.value === 'mix') {
                    if (e.target.checked) {
                        sourceCheckboxes.forEach(cb => cb.checked = true);
                    }
                } else {
                    const mixCheckbox = document.getElementById('source-mix');
                    const allChecked = Array.from(sourceCheckboxes).filter(cb => cb.value !== 'mix').every(cb => cb.checked);
                    mixCheckbox.checked = allChecked;
                }
            });
        });

        addCustomBtn.addEventListener('click', () => {
            const urlInput = document.getElementById('customJsonUrl');
            const url = urlInput.value.trim();
            
            if (url && !this.settings.customUrls.includes(url)) {
                this.settings.customUrls.push(url);
                urlInput.value = '';
                this.renderCustomUrlsList();
            }
        });

        saveBtn.addEventListener('click', () => {
            this.settings.autoPlay = document.getElementById('autoPlay').checked;
            this.settings.showDescriptions = document.getElementById('showDescriptions').checked;
            
            const selectedSources = Array.from(sourceCheckboxes)
                .filter(cb => cb.checked)
                .map(cb => cb.value);
            this.settings.selectedSources = selectedSources;
            
            this.saveSettings();
            overlay.classList.remove('show');
            this.loadVideos();
        });

        this.applySettings();
        this.renderCustomUrlsList();
    }

    handleContextAction(action) {
        switch (action) {
            case 'copy-link':
                navigator.clipboard.writeText(window.location.href);
                break;
            case 'open-new-tab':
                window.open(window.location.href, '_blank');
                break;
            case 'reload':
                window.location.reload();
                break;
        }
    }

    async loadVideos() {
        const loader = document.getElementById('loader');
        const grid = document.getElementById('videoGrid');
        
        try {
            let allVideos = [];
            
            const presets = {
                music: 'https://raw.githubusercontent.com/shirushimori/comfy-vids/main/vid-branch/Song/ENG_Song1.json',
                anime: 'https://raw.githubusercontent.com/shirushimori/comfy-vids/refs/heads/main/vid-branch/anime/ENG-Anime.json',
                movies: 'https://raw.githubusercontent.com/shirushimori/comfy-vids/refs/heads/main/vid-branch/movie/ENG-movie.json'
            };

            if (this.settings.selectedSources.includes('mix')) {
                for (const [key, url] of Object.entries(presets)) {
                    try {
                        const response = await fetch(url);
                        if (response.ok) {
                            const data = await response.json();
                            allVideos = allVideos.concat(Array.isArray(data) ? data : []);
                        }
                    } catch (e) {
                        console.warn(`Failed to load ${key}:`, e);
                    }
                }
            } else {
                for (const source of this.settings.selectedSources) {
                    if (presets[source]) {
                        try {
                            const response = await fetch(presets[source]);
                            if (response.ok) {
                                const data = await response.json();
                                allVideos = allVideos.concat(Array.isArray(data) ? data : []);
                            }
                        } catch (e) {
                            console.warn(`Failed to load ${source}:`, e);
                        }
                    }
                }
            }

            for (const url of this.settings.customUrls) {
                try {
                    const response = await fetch(url);
                    if (response.ok) {
                        const data = await response.json();
                        allVideos = allVideos.concat(Array.isArray(data) ? data : []);
                    }
                } catch (e) {
                    console.warn(`Failed to load custom URL:`, e);
                }
            }

            if (allVideos.length === 0) {
                const response = await fetch('data.json');
                if (response.ok) {
                    allVideos = await response.json();
                }
            }

            this.videos = allVideos;
            loader.style.display = 'none';
            this.renderVideoGrid();
        } catch (error) {
            console.error('Failed to load videos:', error);
            loader.style.display = 'none';
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <p>Failed to load videos. Check your data source settings.</p>
                </div>`;
        }
    }

    renderVideoGrid() {
        const grid = document.getElementById('videoGrid');
        
        if (this.videos.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-secondary);">No videos available</p>';
            return;
        }

        grid.innerHTML = this.videos.map(video => `
            <div class="video-card" data-id="${video.id}">
                <div class="thumbnail-wrapper">
                    <img src="${video['thumbnail-img-url']}" alt="${video.title}" 
                         onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;\\'>🎬</div>'">
                </div>
                <div class="video-card-info">
                    <h3>${video.title}</h3>
                    <p>${video.author} • ${this.formatDate(video['date-time'])}</p>
                    ${video.seasons ? `<span style="color: var(--accent); font-size: 0.75rem;">${video.seasons.length} Seasons</span>` : ''}
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                this.playVideo(id);
            });
        });
    }

    playVideo(id) {
        const video = this.videos.find(v => v.id == id);
        if (!video) {
            console.error('Video not found:', id);
            return;
        }
        if (!video.seasons || video.seasons.length === 0) {
            console.error('No seasons found for video:', video);
            return;
        }

        this.currentVideo = video;
        this.currentSeason = video.seasons[0].season;
        this.currentEpisode = video.seasons[0].episodes[0];

        this.switchView('playerView');

        const titleEl = document.getElementById('videoTitle');
        const authorEl = document.getElementById('videoAuthor');
        const dateEl = document.getElementById('videoDate');
        const descEl = document.getElementById('videoDescription');

        if (titleEl) titleEl.textContent = video.title;
        if (authorEl) authorEl.textContent = video.author;
        if (dateEl) dateEl.textContent = this.formatDate(video['date-time']);
        if (descEl) descEl.textContent = video.description || 'No description provided.';
        
        this.playEpisode(this.currentEpisode);
        this.renderEpisodeNavigation();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    playEpisode(episode) {
        if (!episode) {
            console.error('No episode provided');
            return;
        }
        const wrapper = document.getElementById('videoIframeWrapper');
        if (!wrapper) {
            console.error('videoIframeWrapper element not found');
            return;
        }
        wrapper.innerHTML = episode['video-iframe'] || '<p style="padding: 20px; text-align:center;">Video not available</p>';
    }

    renderEpisodeNavigation() {
        const video = this.currentVideo;
        if (!video || !video.seasons) {
            console.error('No video or seasons for navigation');
            return;
        }

        this.renderSeasonSelect();
        this.renderEpisodeList();
        this.setupEpisodeSearch();

        const select = document.getElementById('seasonSelect');
        if (select) {
            select.removeEventListener('change', this.seasonChangeHandler);
            this.seasonChangeHandler = (e) => {
                this.changeSeason(parseInt(e.target.value));
            };
            select.addEventListener('change', this.seasonChangeHandler);
        }
    }

    renderSeasonSelect() {
        const video = this.currentVideo;
        if (!video || !video.seasons) {
            console.error('No video or seasons for select');
            return;
        }

        const select = document.getElementById('seasonSelect');
        if (!select) {
            console.error('seasonSelect element not found');
            return;
        }

        select.innerHTML = video.seasons.map(s => 
            `<option value="${s.season}" ${s.season == this.currentSeason ? 'selected' : ''}>Season ${s.season}</option>`
        ).join('');
    }

    renderEpisodeList() {
        const video = this.currentVideo;
        if (!video || !video.seasons) {
            console.error('No video or seasons for episode list');
            return;
        }

        const currentSeasonObj = video.seasons.find(s => s.season == this.currentSeason);
        if (!currentSeasonObj || !currentSeasonObj.episodes) {
            console.error('No episodes for season:', this.currentSeason);
            return;
        }

        const list = document.getElementById('episodeList');
        if (!list) {
            console.error('episodeList element not found');
            return;
        }

        list.innerHTML = currentSeasonObj.episodes.map((ep) => `
            <div class="episode-item ${ep === this.currentEpisode ? 'active' : ''}" data-episode-id="${ep.episode}">
                <div class="episode-number">E${ep.episode}</div>
                <div class="episode-title">${ep.title}</div>
            </div>
        `).join('');

        document.querySelectorAll('.episode-item').forEach(item => {
            item.addEventListener('click', () => {
                const episodeNum = parseInt(item.dataset.episodeId);
                const episode = currentSeasonObj.episodes.find(e => e.episode === episodeNum);
                if (episode) {
                    this.currentEpisode = episode;
                    this.playEpisode(episode);
                    this.renderEpisodeList();
                }
            });
        });
    }

    setupEpisodeSearch() {
        const searchInput = document.getElementById('episodeSearch');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.episode-item');
            
            items.forEach(item => {
                const title = item.querySelector('.episode-title').textContent.toLowerCase();
                item.style.display = title.includes(term) ? 'flex' : 'none';
            });
        });
    }

    changeSeason(season) {
        const video = this.currentVideo;
        if (!video || !video.seasons) return;

        const seasonObj = video.seasons.find(s => s.season === season);
        if (seasonObj && seasonObj.episodes && seasonObj.episodes.length > 0) {
            this.currentSeason = season;
            this.currentEpisode = seasonObj.episodes[0];
            this.playEpisode(this.currentEpisode);
            this.renderEpisodeList();
        }
    }

    switchView(viewId) {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        document.getElementById(viewId).classList.add('active');
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, options); 
    }
}

new VideoStreamingApp();
window.app = new VideoStreamingApp();
