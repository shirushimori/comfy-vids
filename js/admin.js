class AdminApp {
    constructor() {
        this.videos = [];
        this.settings = SharedData.loadSettings();
        this.selectedVideoId = null;
    }

    async init() {
        this.videos = await SharedData.loadVideos();
        this.setupEventListeners();
        this.renderSettings();
        this.renderEditor();
        SharedData.setupContextMenu();
    }

    setupEventListeners() {
        // Settings tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSettingsTab(section);
            });
        });

        // Save settings
        const saveSettingsBtn = document.getElementById('saveSettings');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveSettings();
            });
        }

        // Add custom URL
        const addCustomBtn = document.getElementById('addCustomBtn');
        if (addCustomBtn) {
            addCustomBtn.addEventListener('click', () => {
                this.addCustomUrl();
            });
        }

        // Save JSON
        const saveJsonBtn = document.getElementById('saveJsonBtn');
        if (saveJsonBtn) {
            saveJsonBtn.addEventListener('click', () => {
                this.saveJson();
            });
        }
    }

    switchSettingsTab(section) {
        // Update tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Update sections
        document.querySelectorAll('.settings-section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(section).classList.add('active');
    }

    renderSettings() {
        // Data sources
        const sourceCheckboxes = {
            'source-music': this.settings.selectedSources.includes('music'),
            'source-anime': this.settings.selectedSources.includes('anime'),
            'source-movies': this.settings.selectedSources.includes('movies'),
            'source-mix': this.settings.selectedSources.includes('mix')
        };

        Object.entries(sourceCheckboxes).forEach(([id, checked]) => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = checked;
            }
        });

        // Custom URLs
        this.renderCustomUrlsList();
    }

    renderCustomUrlsList() {
        const list = document.getElementById('customUrlsList');
        if (!list) return;

        list.innerHTML = '';
        this.settings.customUrls.forEach((url, index) => {
            const item = document.createElement('div');
            item.className = 'custom-url-item';
            item.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 8px; background: var(--bg-card); border-radius: 4px; margin-top: 8px;';
            item.innerHTML = `
                <span style="font-size: 0.875rem; color: var(--text-secondary); word-break: break-all;">${url}</span>
                <button class="remove-url-btn" data-index="${index}" style="background: none; border: none; color: var(--text-secondary); cursor: pointer; padding: 4px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            `;
            
            item.querySelector('.remove-url-btn').addEventListener('click', () => {
                this.removeCustomUrl(index);
            });
            
            list.appendChild(item);
        });
    }

    addCustomUrl() {
        const input = document.getElementById('customJsonUrl');
        if (!input || !input.value.trim()) return;

        const url = input.value.trim();
        if (!this.settings.customUrls.includes(url)) {
            this.settings.customUrls.push(url);
            input.value = '';
            this.renderCustomUrlsList();
        }
    }

    removeCustomUrl(index) {
        this.settings.customUrls.splice(index, 1);
        this.renderCustomUrlsList();
    }

    saveSettings() {
        this.settings.selectedSources = [];
        
        if (document.getElementById('source-music')?.checked) {
            this.settings.selectedSources.push('music');
        }
        if (document.getElementById('source-anime')?.checked) {
            this.settings.selectedSources.push('anime');
        }
        if (document.getElementById('source-movies')?.checked) {
            this.settings.selectedSources.push('movies');
        }
        if (document.getElementById('source-mix')?.checked) {
            this.settings.selectedSources.push('mix');
        }

        SharedData.saveSettings(this.settings);
        alert('Settings saved successfully!');
    }

    renderEditor() {
        const videosList = document.getElementById('videosList');
        if (!videosList) return;

        videosList.innerHTML = '';
        
        // Add Video button
        const addBtn = document.createElement('button');
        addBtn.className = 'add-video-btn';
        addBtn.textContent = '+ Add Video';
        addBtn.style.cssText = 'width: 100%; padding: 12px; background: var(--accent); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; margin-bottom: 12px; transition: background 0.15s;';
        addBtn.addEventListener('click', () => this.addVideo());
        addBtn.addEventListener('mouseover', () => addBtn.style.background = 'var(--accent-hover)');
        addBtn.addEventListener('mouseout', () => addBtn.style.background = 'var(--accent)');
        videosList.appendChild(addBtn);
        
        // Video list items
        this.videos.forEach(video => {
            const item = document.createElement('div');
            item.className = 'editor-video-item';
            item.style.cssText = `
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 14px 16px;
                background: ${this.selectedVideoId === video.id ? 'var(--accent)' : 'var(--bg-main)'};
                border: 1px solid ${this.selectedVideoId === video.id ? 'var(--accent)' : 'var(--border-color)'};
                border-radius: 4px;
                margin-bottom: 8px;
                cursor: pointer;
                transition: all 0.15s;
                color: ${this.selectedVideoId === video.id ? 'white' : 'var(--text-primary)'};
            `;
            
            const titleEl = document.createElement('div');
            titleEl.style.cssText = 'flex: 1; font-weight: 500;';
            titleEl.textContent = video.title;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.style.cssText = `
                background: none;
                border: none;
                color: inherit;
                font-size: 24px;
                cursor: pointer;
                padding: 0 8px;
                opacity: 0.7;
                transition: opacity 0.15s;
            `;
            deleteBtn.addEventListener('mouseover', () => deleteBtn.style.opacity = '1');
            deleteBtn.addEventListener('mouseout', () => deleteBtn.style.opacity = '0.7');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (confirm('Delete this video?')) {
                    this.videos = this.videos.filter(v => v.id !== video.id);
                    this.renderEditor();
                    document.getElementById('editorContent').innerHTML = '<div class="no-video-selected">Select a video to edit</div>';
                }
            });
            
            item.appendChild(titleEl);
            item.appendChild(deleteBtn);
            
            item.addEventListener('click', () => {
                this.selectedVideoId = video.id;
                this.renderVideoEditor(video);
                this.renderEditor();
            });
            
            item.addEventListener('mouseover', () => {
                if (this.selectedVideoId !== video.id) {
                    item.style.background = 'var(--bg-hover)';
                    item.style.borderColor = 'var(--accent)';
                }
            });
            
            item.addEventListener('mouseout', () => {
                if (this.selectedVideoId !== video.id) {
                    item.style.background = 'var(--bg-main)';
                    item.style.borderColor = 'var(--border-color)';
                }
            });
            
            videosList.appendChild(item);
        });
    }

    renderVideoEditor(video) {
        const content = document.getElementById('editorContent');
        if (!content) return;

        content.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 20px;">
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Title</label>
                    <input type="text" class="video-title-input" value="${video.title}" style="width: 100%; padding: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Author</label>
                    <input type="text" class="video-author-input" value="${video.author}" style="width: 100%; padding: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Description</label>
                    <textarea class="video-desc-input" style="width: 100%; padding: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); min-height: 100px; resize: vertical;">${video.description}</textarea>
                </div>
                <div>
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Thumbnail URL</label>
                    <input type="url" class="video-thumb-input" value="${video['thumbnail-img-url']}" style="width: 100%; padding: 8px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary);">
                </div>
                <div>
                    <h4 style="margin-bottom: 12px;">Seasons & Episodes</h4>
                    <div id="seasonsContainer" style="display: flex; flex-direction: column; gap: 12px;"></div>
                    <button class="add-season-btn" style="margin-top: 12px; padding: 8px 12px; background: var(--accent); color: white; border: none; border-radius: 4px; cursor: pointer;">+ Add Season</button>
                </div>
                <button class="save-video-btn" style="padding: 10px 16px; background: var(--accent); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Save Video</button>
                <button class="delete-video-btn" style="padding: 10px 16px; background: #dc2626; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Delete Video</button>
            </div>
        `;

        this.renderSeasons(video);
        this.setupVideoEditorListeners(video);
    }

    renderSeasons(video) {
        const container = document.getElementById('seasonsContainer');
        if (!container) return;

        container.innerHTML = '';
        video.seasons.forEach((season, seasonIndex) => {
            const seasonEl = document.createElement('div');
            seasonEl.style.cssText = 'padding: 12px; background: var(--bg-card); border-radius: 4px; border: 1px solid var(--border-color);';
            seasonEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <h5 style="margin: 0;">Season ${season.season}</h5>
                    <button class="delete-season-btn" data-season="${seasonIndex}" style="background: none; border: none; color: #dc2626; cursor: pointer;">Delete</button>
                </div>
                <div class="episodes-container" data-season="${seasonIndex}" style="display: flex; flex-direction: column; gap: 8px;"></div>
                <button class="add-episode-btn" data-season="${seasonIndex}" style="margin-top: 8px; padding: 6px 12px; background: var(--accent); color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.875rem;">+ Add Episode</button>
            `;
            container.appendChild(seasonEl);

            this.renderEpisodes(video, seasonIndex, seasonEl.querySelector('.episodes-container'));
        });
    }

    renderEpisodes(video, seasonIndex, container) {
        const season = video.seasons[seasonIndex];
        if (!season.episodes) season.episodes = [];

        container.innerHTML = '';
        season.episodes.forEach((episode, episodeIndex) => {
            const episodeEl = document.createElement('div');
            episodeEl.style.cssText = 'padding: 8px; background: var(--bg-main); border-radius: 4px; border: 1px solid var(--border-color);';
            episodeEl.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-weight: 500;">Episode ${episode.episode}</span>
                    <button class="delete-episode-btn" data-season="${seasonIndex}" data-episode="${episodeIndex}" style="background: none; border: none; color: #dc2626; cursor: pointer; font-size: 0.875rem;">Delete</button>
                </div>
                <textarea class="episode-iframe-input" data-season="${seasonIndex}" data-episode="${episodeIndex}" style="width: 100%; padding: 6px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 4px; color: var(--text-primary); font-size: 0.75rem; min-height: 60px; resize: vertical; font-family: monospace;">${episode['video-iframe'] || ''}</textarea>
            `;
            container.appendChild(episodeEl);
        });
    }

    setupVideoEditorListeners(video) {
        // Add season
        document.querySelector('.add-season-btn')?.addEventListener('click', () => {
            const newSeason = {
                season: Math.max(...video.seasons.map(s => s.season), 0) + 1,
                episodes: []
            };
            video.seasons.push(newSeason);
            this.renderSeasons(video);
            this.setupVideoEditorListeners(video);
        });

        // Delete season
        document.querySelectorAll('.delete-season-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seasonIndex = parseInt(e.target.dataset.season);
                video.seasons.splice(seasonIndex, 1);
                this.renderSeasons(video);
                this.setupVideoEditorListeners(video);
            });
        });

        // Add episode
        document.querySelectorAll('.add-episode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seasonIndex = parseInt(e.target.dataset.season);
                const season = video.seasons[seasonIndex];
                const newEpisode = {
                    episode: (season.episodes?.length || 0) + 1,
                    title: `Episode ${(season.episodes?.length || 0) + 1}`,
                    'video-iframe': ''
                };
                if (!season.episodes) season.episodes = [];
                season.episodes.push(newEpisode);
                this.renderSeasons(video);
                this.setupVideoEditorListeners(video);
            });
        });

        // Delete episode
        document.querySelectorAll('.delete-episode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const seasonIndex = parseInt(e.target.dataset.season);
                const episodeIndex = parseInt(e.target.dataset.episode);
                video.seasons[seasonIndex].episodes.splice(episodeIndex, 1);
                this.renderSeasons(video);
                this.setupVideoEditorListeners(video);
            });
        });

        // Save video
        document.querySelector('.save-video-btn')?.addEventListener('click', () => {
            video.title = document.querySelector('.video-title-input')?.value || video.title;
            video.author = document.querySelector('.video-author-input')?.value || video.author;
            video.description = document.querySelector('.video-desc-input')?.value || video.description;
            video['thumbnail-img-url'] = document.querySelector('.video-thumb-input')?.value || video['thumbnail-img-url'];

            // Update episode iframes
            document.querySelectorAll('.episode-iframe-input').forEach(input => {
                const seasonIndex = parseInt(input.dataset.season);
                const episodeIndex = parseInt(input.dataset.episode);
                video.seasons[seasonIndex].episodes[episodeIndex]['video-iframe'] = input.value;
            });

            alert('Video updated! Click "Save JSON" to persist changes.');
        });

        // Delete video
        document.querySelector('.delete-video-btn')?.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this video?')) {
                this.videos = this.videos.filter(v => v.id !== video.id);
                this.renderEditor();
                document.getElementById('editorContent').innerHTML = '<div class="no-video-selected">Select a video to edit</div>';
            }
        });
    }

    addVideo() {
        const newVideo = {
            id: Math.max(...this.videos.map(v => v.id), 0) + 1,
            title: 'New Video',
            author: 'Unknown',
            description: '',
            'thumbnail-img-url': '',
            'date-time': new Date().toISOString(),
            seasons: [{ season: 1, episodes: [] }]
        };
        this.videos.push(newVideo);
        this.renderEditor();
    }

    saveJson() {
        const dataStr = JSON.stringify(this.videos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.json';
        link.click();
        URL.revokeObjectURL(url);
        alert('JSON file downloaded!');
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new AdminApp();
    app.init();
});
