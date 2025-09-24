const PRIORITY_SCORES = {
  staff: 4,
  supporter: 3,
  standard: 2,
  guest: 1
};

const PRIORITY_SPEEDUP_MINUTES = {
  staff: 10,
  supporter: 6,
  standard: 0,
  guest: 0
};

const ADMIN_CREDENTIALS = {
  username: 'command',
  password: 'apex-admin'
};

const CHECKOUT_WINDOW_MINUTES = 15;
const MAX_CHECKOUT_QUANTITY = 10;
const DEFAULT_TEBEX_BASE = 'https://store.apexrp.example';

const state = {
  banner: {
    title: 'Apex Roleplay Network',
    tagline: 'Professional FiveM storytelling with a committed staff team and thriving community.',
    callout: 'Now recruiting dedicated emergency services and gang leadership roles.'
  },
  joinSteps: [
    'Join our Discord and link your Steam account in #server-identity.',
    'Read the community handbook and watch the onboarding video.',
    'Submit the appropriate application form below and schedule your interview.',
    'Install FiveM, add the Apex RP server to your favourites, and prepare your character dossier.'
  ],
  rules: {
    roleplay: [
      {
        id: 'rp-1',
        title: 'Stay in character',
        description:
          'Your character should make believable decisions. Avoid breaking immersion or referencing out-of-character knowledge during scenes.'
      },
      {
        id: 'rp-2',
        title: 'Escalate with intent',
        description:
          'Conflict must be story-driven. Provide opportunities for retaliation or negotiation before violence, and respect value-of-life expectations.'
      },
      {
        id: 'rp-3',
        title: 'Respect scene control',
        description:
          'Follow directions from scene leads such as command staff or event runners. Use /ooc for quick clarifications only when necessary.'
      }
    ],
    community: [
      {
        id: 'com-1',
        title: 'Zero tolerance harassment',
        description:
          'Discrimination, hate speech, and targeted harassment are instant bans. Treat every player and staff member with respect on all platforms.'
      },
      {
        id: 'com-2',
        title: 'Discord professionalism',
        description:
          'Use proper channels for questions, reports, and suggestions. Follow ticket templates so staff can resolve issues quickly.'
      },
      {
        id: 'com-3',
        title: 'Content policy',
        description:
          'Streaming or sharing content from Apex RP requires appropriate tags and compliance with Twitch/YouTube community guidelines.'
      }
    ]
  },
  news: [
    {
      id: 'news-1',
      title: '1.7 City Update deployed',
      excerpt: 'Drug laboratories, new MDT for LEO, and rebuilt hospital interior are now live.',
      body:
        'Our latest patch introduces modular drug labs, an expanded MDT for the LSPD, and an EMS trauma overhaul. Read the changelog for bug fixes and developer notes.',
      publishedAt: '2024-05-22T18:00:00Z',
      author: 'Development Team'
    },
    {
      id: 'news-2',
      title: 'Summer whitelist drive',
      excerpt: 'Applications for story-driven civilians are open with fast-tracked review windows.',
      body:
        'We are searching for storytellers who enjoy collaborative RP. Submit your whitelist dossier and attend an orientation session hosted twice per week.',
      publishedAt: '2024-06-10T21:30:00Z',
      author: 'Staff Command'
    },
    {
      id: 'news-3',
      title: 'Faction shake-ups & recruitment',
      excerpt: 'Mechanic unions, nightlife ownership, and new gang opportunities are on the horizon.',
      body:
        'Business proposals and gang pitches are now reviewed in the staff portal. Bring a unique angle—economy-focused, community-driven RP receives priority consideration.',
      publishedAt: '2024-06-28T16:15:00Z',
      author: 'Community Management'
    }
  ],
  jobs: [
    {
      id: 'job-police',
      name: 'Los Santos Police Department',
      description:
        'Structured patrols, investigations, and tactical responses with full MDT, evidence, and courtroom support.',
      focus: 'Patrol | Investigations | Command ladder',
      icon: '🚓'
    },
    {
      id: 'job-ems',
      name: 'Los Santos Medical Services',
      description:
        'Advanced trauma response, field triage, and hospital roleplay with a custom patient care system.',
      focus: 'Rescue | Healing | Training',
      icon: '🚑'
    },
    {
      id: 'job-mechanic',
      name: 'Mechanics & Tuners',
      description:
        'Own a shop, manage stock, and provide roadside rescue. Includes custom tuning UI and tow fleet.',
      focus: 'Business | Economy | Crafting',
      icon: '🛠️'
    },
    {
      id: 'job-gang',
      name: 'Gangs & Crime',
      description:
        'Organise sophisticated operations, maintain turf, and negotiate with crews across the city under staff oversight.',
      focus: 'Strategy | Storytelling | Territory',
      icon: '🦈'
    },
    {
      id: 'job-civ',
      name: 'Civilians & Entrepreneurs',
      description:
        'Launch nightclubs, run media crews, or deliver experiences like extreme sports events.',
      focus: 'Creativity | Events | Social',
      icon: '🎭'
    }
  ],
  gallery: [
    {
      id: 'gallery-1',
      title: 'City skyline patrol',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'gallery-2',
      title: 'Hospital grand re-opening',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'gallery-3',
      title: 'Community street festival',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'gallery-4',
      title: 'Emergency services training day',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80'
    }
  ],
  applications: [
    {
      id: 'app-1',
      role: 'whitelist',
      characterName: 'Nova Ridge',
      discord: 'NovaRidge#2244',
      experience: 'Serious RP for 3 years, civilian and EMS lines.',
      availability: 'EU evenings',
      motivation: 'Looking to build business RP and coordinate community events.',
      status: 'pending',
      submittedAt: '2024-06-25T18:30:00Z'
    },
    {
      id: 'app-2',
      role: 'police',
      characterName: 'Jordan Voss',
      discord: 'Voss#1881',
      experience: 'Former Sgt. in DOJRP, familiar with penal code and report writing.',
      availability: 'US afternoons & weekends',
      motivation: 'Excited to mentor cadets and help stand up detective bureau.',
      status: 'pending',
      submittedAt: '2024-06-22T02:00:00Z'
    },
    {
      id: 'app-3',
      role: 'ems',
      characterName: 'Skyler Dune',
      discord: 'SkyDune#1020',
      experience: 'Registered EMT, played EMS on multiple FiveM servers.',
      availability: 'US late nights',
      motivation: 'Wants to expand trauma scenarios and create medical storylines.',
      status: 'approved',
      submittedAt: '2024-06-10T20:10:00Z'
    }
  ],
  supportTickets: [
    {
      id: 'ticket-1',
      subject: 'Whitelist interview scheduling',
      user: 'Lyric',
      channel: 'Discord',
      status: 'open',
      createdAt: '2024-06-26T14:45:00Z'
    },
    {
      id: 'ticket-2',
      subject: 'Refund request - vehicle duplication',
      user: 'Catalina',
      channel: 'Web',
      status: 'pending',
      createdAt: '2024-06-24T19:10:00Z'
    },
    {
      id: 'ticket-3',
      subject: 'Gang strike appeal',
      user: 'Trace',
      channel: 'Discord',
      status: 'resolved',
      createdAt: '2024-06-15T23:00:00Z'
    }
  ],
  comments: [
    {
      id: 'comment-1',
      user: 'Trace',
      message: 'Huge props to the EMS team, training day was incredible.',
      status: 'published',
      submittedAt: '2024-06-18T12:15:00Z'
    },
    {
      id: 'comment-2',
      user: 'Aria',
      message: 'Please review the tuner shop exploit, cars are disappearing.',
      status: 'flagged',
      submittedAt: '2024-06-20T21:45:00Z'
    }
  ],
  discordSettings: {
    guildId: '112233445566778899',
    channelId: '998877665544332211'
  },
  queue: {
    active: [
      {
        id: '1',
        playerName: 'NovaRift',
        steamId: 'steam:11000010c0ffee',
        role: 'LSPD Sergeant',
        priority: 'staff',
        notes: "Coordinating tonight's patrol.",
        joinedAt: new Date(Date.now() - 12 * 60000)
      },
      {
        id: '2',
        playerName: 'Lyric',
        steamId: 'steam:1100001088beef',
        role: 'EMS Chief',
        priority: 'supporter',
        notes: 'On duty, trauma team ready.',
        joinedAt: new Date(Date.now() - 9 * 60000)
      },
      {
        id: '3',
        playerName: 'Catalina',
        steamId: 'steam:1100001099abcd',
        role: 'Civilian Entrepreneur',
        priority: 'standard',
        notes: 'Hosting a Vespucci Beach market.',
        joinedAt: new Date(Date.now() - 7 * 60000)
      },
      {
        id: '4',
        playerName: 'Trace',
        steamId: 'steam:11000010fff1234',
        role: 'Street Racer',
        priority: 'guest',
        notes: 'Fresh from whitelist orientation.',
        joinedAt: new Date(Date.now() - 4 * 60000)
      }
    ],
    history: [],
    processed: 48
  },
  serverStatus: {
    state: 'Online',
    playersOnline: 182,
    maxPlayers: 350,
    queueLength: 4,
    uptime: '18h 42m',
    lastRestart: 'Today 09:00 UTC',
    address: 'fivem://apexroleplay'
  },
  storeItems: [
    {
      id: 'store-1',
      packageId: 4101,
      name: 'Priority Supporter',
      description: 'Queue priority, supporter role, and monthly merch raffle entry.',
      price: '£12.00',
      priceValue: { amount: 12, currency: 'GBP' },
      active: true,
      platform: 'Tebex',
      category: 'Support'
    },
    {
      id: 'store-2',
      packageId: 4125,
      name: 'Gang Package',
      description: 'Faction toolkit review with staff, custom spray, and stash upgrades.',
      price: '£45.00',
      priceValue: { amount: 45, currency: 'GBP' },
      active: true,
      platform: 'Tebex',
      category: 'Faction'
    },
    {
      id: 'store-3',
      name: 'One-time Donation',
      description: 'Support server costs via PayPal. Includes Discord donor tag.',
      price: 'Custom',
      priceValue: null,
      active: true,
      platform: 'PayPal',
      donateUrl: 'https://paypal.me/apexrp'
    }
  ],
  purchaseState: {},
  adminUser: null,
  adminFilters: {
    applicationRole: 'all'
  },
  applicationFeedback: '',
  supportFeedback: ''
};

const counters = {
  news: state.news.length + 1,
  gallery: state.gallery.length + 1,
  applications: state.applications.length + 1,
  tickets: state.supportTickets.length + 1
};

const applicationRoleCards = [
  {
    id: 'role-whitelist',
    title: 'Whitelist',
    description: 'Baseline access to the city. Required before any other applications.'
  },
  {
    id: 'role-police',
    title: 'Police',
    description: 'Structured academy, SOP exams, and mentorship with command staff.'
  },
  {
    id: 'role-ems',
    title: 'EMS',
    description: 'Comprehensive medical training, hospital RP, and rescue operations.'
  },
  {
    id: 'role-mechanic',
    title: 'Mechanic',
    description: 'Manage shop inventory, tuning upgrades, and roadside assistance.'
  },
  {
    id: 'role-staff',
    title: 'Staff',
    description: 'Moderation, event curation, and application reviews for trusted members.'
  }
];

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function statusClass(status) {
  switch (status) {
    case 'approved':
    case 'resolved':
      return 'status-pill status-pill--approved';
    case 'denied':
      return 'status-pill status-pill--denied';
    case 'pending':
      return 'status-pill status-pill--pending';
    case 'open':
      return 'status-pill status-pill--open';
    default:
      return 'status-pill';
  }
}

function sortQueue() {
  state.queue.active.sort((a, b) => {
    const scoreDelta = (PRIORITY_SCORES[b.priority] || 0) - (PRIORITY_SCORES[a.priority] || 0);
    if (scoreDelta !== 0) {
      return scoreDelta;
    }
    return a.joinedAt.getTime() - b.joinedAt.getTime();
  });
}

function minutesBetween(now, joinedAt) {
  return Math.max(1, Math.round((now - joinedAt) / 60000));
}

function calculateQueueStats() {
  sortQueue();
  const now = Date.now();
  const active = state.queue.active.map((entry, index) => {
    const waitedMinutes = minutesBetween(now, entry.joinedAt.getTime());
    const base = (index + 1) * 5;
    const speedup = PRIORITY_SPEEDUP_MINUTES[entry.priority] || 0;
    const etaMinutes = Math.max(waitedMinutes, Math.max(3, base - speedup));
    return {
      ...entry,
      position: index + 1,
      waitedMinutes,
      etaMinutes
    };
  });

  const totalWait = active.reduce((acc, entry) => acc + entry.waitedMinutes, 0);
  const priorityBreakdown = active.reduce((acc, entry) => {
    const key = entry.priority || 'standard';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return {
    activeCount: active.length,
    processedCount: state.queue.processed,
    averageWait: active.length ? Math.round(totalWait / active.length) : 0,
    longestWait: active.reduce((max, entry) => Math.max(max, entry.waitedMinutes), 0),
    priorityBreakdown,
    active
  };
}

function renderHero() {
  document.getElementById('hero-title').textContent = state.banner.title;
  document.getElementById('hero-tagline').textContent = state.banner.tagline;
  document.getElementById('hero-callout').textContent = state.banner.callout;
}

function renderJoinSteps() {
  const list = document.getElementById('join-steps');
  list.innerHTML = '';
  state.joinSteps.forEach((step) => {
    const li = document.createElement('li');
    li.textContent = step;
    list.appendChild(li);
  });
}

function renderRules() {
  const roleplayList = document.getElementById('rule-roleplay');
  const communityList = document.getElementById('rule-community');
  roleplayList.innerHTML = '';
  communityList.innerHTML = '';

  state.rules.roleplay.forEach((rule) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = rule.title;
    const span = document.createElement('span');
    span.textContent = rule.description;
    li.append(strong, span);
    roleplayList.appendChild(li);
  });

  state.rules.community.forEach((rule) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.textContent = rule.title;
    const span = document.createElement('span');
    span.textContent = rule.description;
    li.append(strong, span);
    communityList.appendChild(li);
  });
}

function renderNews() {
  const container = document.getElementById('news-grid');
  container.innerHTML = '';
  state.news.forEach((item) => {
    const article = document.createElement('article');
    article.className = 'news-item';

    const time = document.createElement('time');
    time.textContent = formatDate(item.publishedAt);

    const heading = document.createElement('h3');
    heading.textContent = item.title;

    const excerpt = document.createElement('p');
    excerpt.textContent = item.excerpt;

    article.append(time, heading, excerpt);

    if (item.body) {
      const body = document.createElement('p');
      body.textContent = item.body;
      article.appendChild(body);
    }

    const small = document.createElement('small');
    small.textContent = `Posted by ${item.author}`;
    article.appendChild(small);

    container.appendChild(article);
  });
}

function renderJobs() {
  const container = document.getElementById('jobs-grid');
  container.innerHTML = '';
  state.jobs.forEach((job) => {
    const card = document.createElement('article');
    card.className = 'job-card';

    const icon = document.createElement('span');
    icon.textContent = job.icon;

    const heading = document.createElement('h3');
    heading.textContent = job.name;

    const description = document.createElement('p');
    description.textContent = job.description;

    const focus = document.createElement('small');
    focus.textContent = job.focus;

    card.append(icon, heading, description, focus);
    container.appendChild(card);
  });
}

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  container.innerHTML = '';
  state.gallery.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';

    if (item.type === 'video') {
      const frame = document.createElement('iframe');
      frame.title = item.title;
      frame.src = item.url;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      wrapper.appendChild(frame);
    } else {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.title;
      wrapper.appendChild(img);
    }

    const caption = document.createElement('span');
    caption.className = 'gallery-item__caption';
    caption.textContent = item.title;
    wrapper.appendChild(caption);

    if (item.type) {
      const badge = document.createElement('small');
      badge.textContent = item.type;
      badge.style.position = 'absolute';
      badge.style.top = '0.75rem';
      badge.style.left = '0.75rem';
      badge.style.background = 'rgba(5,7,15,0.65)';
      badge.style.padding = '0.2rem 0.5rem';
      badge.style.borderRadius = '0.6rem';
      wrapper.appendChild(badge);
    }

    container.appendChild(wrapper);
  });
}

function renderApplicationRoles() {
  const container = document.getElementById('application-roles');
  container.innerHTML = '';
  applicationRoleCards.forEach((role) => {
    const card = document.createElement('article');
    card.className = 'card';
    const heading = document.createElement('h3');
    heading.textContent = role.title;
    const paragraph = document.createElement('p');
    paragraph.textContent = role.description;
    card.append(heading, paragraph);
    container.appendChild(card);
  });
}

function renderQueueMetrics() {
  const stats = calculateQueueStats();
  state.serverStatus.queueLength = stats.activeCount;

  document.getElementById('queue-waiting').textContent = `${stats.activeCount} players waiting`;
  document.getElementById('queue-average').textContent = `Avg wait ${stats.averageWait} min · Served ${stats.processedCount}`;
  const breakdown = stats.priorityBreakdown;
  document.getElementById('queue-priority').textContent = `Priority mix: staff ${breakdown.staff || 0} · supporter ${
    breakdown.supporter || 0
  } · standard ${breakdown.standard || 0}`;

  const server = state.serverStatus;
  document.getElementById('server-state').textContent = server.state;
  document.getElementById('server-population').textContent = `${server.playersOnline}/${server.maxPlayers} online · Queue ${
    server.queueLength
  }`;
  document.getElementById('server-uptime').textContent = `Uptime ${server.uptime}`;
  document.getElementById('server-restart').textContent = `Last restart ${server.lastRestart}`;
  document.getElementById('server-address').textContent = `Connect: ${server.address}`;
  document.getElementById('server-peak').textContent = server.maxPlayers;
  document.getElementById('footer-address').textContent = server.address;
}

function renderStore() {
  const container = document.getElementById('store-grid');
  container.innerHTML = '';

  state.storeItems.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'card';

    const heading = document.createElement('h3');
    heading.textContent = item.name;
    card.appendChild(heading);

    const description = document.createElement('p');
    description.textContent = item.description;
    card.appendChild(description);

    const price = document.createElement('strong');
    price.textContent = item.price;
    card.appendChild(price);

    if (item.packageId) {
      const packageTag = document.createElement('span');
      packageTag.textContent = `Package #${item.packageId}`;
      card.appendChild(packageTag);
    }

    const platform = document.createElement('span');
    platform.textContent = `Platform: ${item.platform}`;
    card.appendChild(platform);

    const status = document.createElement('span');
    status.textContent = `Status: ${item.active ? 'Available' : 'Hidden'}`;
    card.appendChild(status);

    if (item.platform === 'Tebex' && item.active) {
      const form = document.createElement('form');
      form.className = 'tebex-form';

      const usernameLabel = document.createElement('label');
      usernameLabel.textContent = 'Character / IGN';
      const usernameInput = document.createElement('input');
      usernameInput.name = 'username';
      usernameInput.placeholder = 'Nova Ridge';
      usernameInput.required = true;
      usernameLabel.appendChild(usernameInput);

      const emailLabel = document.createElement('label');
      emailLabel.textContent = 'Contact email (optional)';
      const emailInput = document.createElement('input');
      emailInput.name = 'email';
      emailInput.type = 'email';
      emailInput.placeholder = 'you@example.com';
      emailLabel.appendChild(emailInput);

      const quantityLabel = document.createElement('label');
      quantityLabel.textContent = 'Quantity';
      const quantityInput = document.createElement('input');
      quantityInput.name = 'quantity';
      quantityInput.type = 'number';
      quantityInput.min = '1';
      quantityInput.max = String(MAX_CHECKOUT_QUANTITY);
      quantityInput.value = '1';
      quantityLabel.appendChild(quantityInput);

      const submitButton = document.createElement('button');
      submitButton.className = 'button button--primary';
      submitButton.type = 'submit';
      submitButton.textContent =
        state.purchaseState[item.id]?.status === 'loading' ? 'Creating checkout…' : 'Purchase via Tebex';

      if (state.purchaseState[item.id]?.status === 'loading') {
        submitButton.disabled = true;
      }

      form.append(usernameLabel, emailLabel, quantityLabel, submitButton);

      form.addEventListener('submit', (event) => handleTebexPurchase(event, item));

      card.appendChild(form);

      const feedbackState = state.purchaseState[item.id];
      if (feedbackState?.status === 'success') {
        const feedback = document.createElement('div');
        feedback.className = 'purchase-feedback purchase-feedback--success';
        const message =
          feedbackState.message || 'Checkout created. Complete your purchase in the Tebex tab.';
        if (feedbackState.redirectUrl) {
          const text = document.createElement('span');
          text.textContent = `${message} `;
          const link = document.createElement('a');
          link.href = feedbackState.redirectUrl;
          link.target = '_blank';
          link.rel = 'noreferrer';
          link.textContent = 'Open Tebex checkout';
          feedback.append(text, link);
        } else {
          feedback.textContent = message;
        }
        card.appendChild(feedback);
      } else if (feedbackState?.status === 'error') {
        const feedback = document.createElement('div');
        feedback.className = 'purchase-feedback purchase-feedback--error';
        feedback.textContent = feedbackState.message;
        card.appendChild(feedback);
      }
    } else {
      const actions = document.createElement('div');
      actions.className = 'admin-actions';
      const link = document.createElement('a');
      link.href = item.donateUrl || DEFAULT_TEBEX_BASE;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = 'Open store';
      actions.appendChild(link);
      card.appendChild(actions);
    }

    container.appendChild(card);
  });
}

function renderDiscord() {
  const frame = document.getElementById('discord-embed');
  frame.src = `https://discord.com/widget?id=${state.discordSettings.guildId}&theme=dark`;
}

function renderSupportStats() {
  const open = state.supportTickets.filter((ticket) => ticket.status === 'open').length;
  const pending = state.supportTickets.filter((ticket) => ticket.status === 'pending').length;
  const resolved = state.supportTickets.filter((ticket) => ticket.status === 'resolved').length;
  const total = state.supportTickets.length;

  document.getElementById('ticket-open').textContent = open;
  document.getElementById('ticket-pending').textContent = pending;
  document.getElementById('ticket-resolved').textContent = resolved;
  document.getElementById('ticket-total').textContent = total;
}

function renderFeedback(id, message) {
  const element = document.getElementById(id);
  if (!element) return;
  if (message) {
    element.textContent = message;
    element.hidden = false;
  } else {
    element.textContent = '';
    element.hidden = true;
  }
}

function renderAdminPanel() {
  const login = document.getElementById('admin-login');
  const panel = document.getElementById('admin-panel');
  if (state.adminUser) {
    login.hidden = true;
    panel.hidden = false;
    document.getElementById('admin-welcome').textContent = `Welcome back, ${state.adminUser.username}. Manage the city below.`;
    renderAdminStats();
    renderAdminNews();
    renderAdminRules();
    renderAdminGallery();
    renderAdminApplications();
    renderAdminTickets();
    renderAdminComments();
    renderAdminStoreControls();
    populateServerForm();
    populateDiscordForm();
  } else {
    login.hidden = false;
    panel.hidden = true;
    document.getElementById('login-error').hidden = true;
  }
}

function renderAdminStats() {
  const applications = state.applications;
  const pending = applications.filter((app) => app.status === 'pending').length;
  const approved = applications.filter((app) => app.status === 'approved').length;
  const denied = applications.filter((app) => app.status === 'denied').length;
  const total = applications.length;
  const openTickets = state.supportTickets.filter((ticket) => ticket.status === 'open').length;
  const flaggedComments = state.comments.filter((comment) => comment.status === 'flagged').length;

  document.getElementById('admin-app-total').textContent = total;
  document.getElementById('admin-app-pending').textContent = pending;
  document.getElementById('admin-app-approved').textContent = approved;
  document.getElementById('admin-app-denied').textContent = denied;
  document.getElementById('admin-ticket-open').textContent = openTickets;
  document.getElementById('admin-comments-flagged').textContent = flaggedComments;
}

function renderAdminNews() {
  const container = document.getElementById('admin-news-grid');
  container.innerHTML = '';

  state.news.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'news-item';

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Headline';
    const titleInput = document.createElement('input');
    titleInput.value = item.title;
    titleInput.addEventListener('input', (event) => {
      item.title = event.target.value;
      renderNews();
    });
    titleLabel.appendChild(titleInput);

    const summaryLabel = document.createElement('label');
    summaryLabel.textContent = 'Summary';
    const summaryInput = document.createElement('input');
    summaryInput.value = item.excerpt;
    summaryInput.addEventListener('input', (event) => {
      item.excerpt = event.target.value;
      renderNews();
    });
    summaryLabel.appendChild(summaryInput);

    const bodyLabel = document.createElement('label');
    bodyLabel.textContent = 'Body';
    const bodyInput = document.createElement('textarea');
    bodyInput.value = item.body || '';
    bodyInput.addEventListener('input', (event) => {
      item.body = event.target.value;
      renderNews();
    });
    bodyLabel.appendChild(bodyInput);

    const meta = document.createElement('small');
    meta.textContent = `Published ${formatDate(item.publishedAt)} · ${item.author}`;

    wrapper.append(titleLabel, summaryLabel, bodyLabel, meta);
    container.appendChild(wrapper);
  });
}

function renderAdminRules() {
  const container = document.getElementById('admin-rules');
  container.innerHTML = '';

  ['roleplay', 'community'].forEach((group) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.background = 'rgba(12,16,31,0.6)';

    const heading = document.createElement('h4');
    heading.textContent = group === 'roleplay' ? 'Roleplay standards' : 'Community conduct';
    card.appendChild(heading);

    state.rules[group].forEach((rule) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'admin-actions';
      wrapper.style.alignItems = 'stretch';
      wrapper.style.flexDirection = 'column';

      const titleLabel = document.createElement('label');
      titleLabel.textContent = 'Title';
      const titleInput = document.createElement('input');
      titleInput.value = rule.title;
      titleInput.addEventListener('input', (event) => {
        rule.title = event.target.value;
        renderRules();
      });
      titleLabel.appendChild(titleInput);

      const descriptionLabel = document.createElement('label');
      descriptionLabel.textContent = 'Description';
      const descriptionInput = document.createElement('textarea');
      descriptionInput.value = rule.description;
      descriptionInput.addEventListener('input', (event) => {
        rule.description = event.target.value;
        renderRules();
      });
      descriptionLabel.appendChild(descriptionInput);

      wrapper.append(titleLabel, descriptionLabel);
      card.appendChild(wrapper);
    });

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'button button--ghost';
    addButton.textContent = group === 'roleplay' ? 'Add RP rule' : 'Add community rule';
    addButton.addEventListener('click', () => {
      const id = `${group}-${Date.now()}`;
      state.rules[group].push({
        id,
        title: 'New rule',
        description: 'Describe the guideline here.'
      });
      renderRules();
      renderAdminRules();
    });
    card.appendChild(addButton);

    container.appendChild(card);
  });
}

function renderAdminGallery() {
  const container = document.getElementById('admin-gallery-grid');
  container.innerHTML = '';

  state.gallery.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-item';

    if (item.type === 'video') {
      const frame = document.createElement('iframe');
      frame.title = item.title;
      frame.src = item.url;
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.allowFullscreen = true;
      wrapper.appendChild(frame);
    } else {
      const img = document.createElement('img');
      img.src = item.url;
      img.alt = item.title;
      wrapper.appendChild(img);
    }

    const caption = document.createElement('span');
    caption.className = 'gallery-item__caption';
    caption.textContent = item.title;
    wrapper.appendChild(caption);

    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'button button--ghost';
    remove.textContent = 'Remove';
    remove.style.position = 'absolute';
    remove.style.top = '0.75rem';
    remove.style.right = '0.75rem';
    remove.addEventListener('click', () => {
      state.gallery = state.gallery.filter((entry) => entry.id !== item.id);
      renderGallery();
      renderAdminGallery();
    });
    wrapper.appendChild(remove);

    container.appendChild(wrapper);
  });
}

function filteredApplications() {
  if (state.adminFilters.applicationRole === 'all') {
    return state.applications.slice();
  }
  return state.applications.filter((app) => app.role === state.adminFilters.applicationRole);
}

function renderAdminApplications() {
  const tbody = document.querySelector('#admin-app-table tbody');
  tbody.innerHTML = '';
  const apps = filteredApplications();
  document.getElementById('admin-app-count').textContent = `${apps.length} results`;
  document.getElementById('admin-app-filter').value = state.adminFilters.applicationRole;

  apps.forEach((app) => {
    const row = document.createElement('tr');

    const roleCell = document.createElement('td');
    roleCell.textContent = app.role;

    const characterCell = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = app.characterName;
    const details = document.createElement('div');
    details.textContent = app.motivation || app.experience || '';
    characterCell.append(strong, details);

    const discordCell = document.createElement('td');
    discordCell.textContent = app.discord;

    const submittedCell = document.createElement('td');
    submittedCell.textContent = formatDate(app.submittedAt);

    const statusCell = document.createElement('td');
    const status = document.createElement('span');
    status.className = statusClass(app.status);
    status.textContent = app.status;
    statusCell.appendChild(status);

    const actionsCell = document.createElement('td');
    const actions = document.createElement('div');
    actions.className = 'admin-actions';

    const approve = document.createElement('button');
    approve.type = 'button';
    approve.textContent = 'Approve';
    approve.addEventListener('click', () => updateApplicationStatus(app.id, 'approved'));

    const deny = document.createElement('button');
    deny.type = 'button';
    deny.textContent = 'Deny';
    deny.addEventListener('click', () => updateApplicationStatus(app.id, 'denied'));

    const reset = document.createElement('button');
    reset.type = 'button';
    reset.textContent = 'Reset';
    reset.addEventListener('click', () => updateApplicationStatus(app.id, 'pending'));

    actions.append(approve, deny, reset);
    actionsCell.appendChild(actions);

    row.append(roleCell, characterCell, discordCell, submittedCell, statusCell, actionsCell);
    tbody.appendChild(row);
  });
}

function renderAdminTickets() {
  const tbody = document.querySelector('#admin-ticket-table tbody');
  tbody.innerHTML = '';
  state.supportTickets.forEach((ticket) => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = ticket.id;

    const subjectCell = document.createElement('td');
    subjectCell.textContent = ticket.subject;

    const userCell = document.createElement('td');
    userCell.textContent = ticket.user;

    const channelCell = document.createElement('td');
    channelCell.textContent = ticket.channel;

    const createdCell = document.createElement('td');
    createdCell.textContent = formatDate(ticket.createdAt);

    const statusCell = document.createElement('td');
    const status = document.createElement('span');
    status.className = statusClass(ticket.status);
    status.textContent = ticket.status;
    statusCell.appendChild(status);

    const actionsCell = document.createElement('td');
    const actions = document.createElement('div');
    actions.className = 'admin-actions';

    const markOpen = document.createElement('button');
    markOpen.type = 'button';
    markOpen.textContent = 'Mark open';
    markOpen.addEventListener('click', () => updateTicketStatus(ticket.id, 'open'));

    const pending = document.createElement('button');
    pending.type = 'button';
    pending.textContent = 'Pending';
    pending.addEventListener('click', () => updateTicketStatus(ticket.id, 'pending'));

    const resolve = document.createElement('button');
    resolve.type = 'button';
    resolve.textContent = 'Resolve';
    resolve.addEventListener('click', () => updateTicketStatus(ticket.id, 'resolved'));

    actions.append(markOpen, pending, resolve);
    actionsCell.appendChild(actions);

    row.append(idCell, subjectCell, userCell, channelCell, createdCell, statusCell, actionsCell);
    tbody.appendChild(row);
  });
}

function renderAdminComments() {
  const container = document.getElementById('admin-comments');
  container.innerHTML = '';
  state.comments.forEach((comment) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'admin-actions';
    wrapper.style.alignItems = 'stretch';
    wrapper.style.flexDirection = 'column';

    const strong = document.createElement('strong');
    strong.textContent = comment.user;
    const message = document.createElement('span');
    message.textContent = comment.message;
    const meta = document.createElement('small');
    meta.textContent = `Submitted ${formatDate(comment.submittedAt)}`;

    const actions = document.createElement('div');
    actions.className = 'admin-actions';

    const status = document.createElement('span');
    status.className = statusClass(comment.status);
    status.textContent = comment.status;

    const publish = document.createElement('button');
    publish.type = 'button';
    publish.textContent = 'Publish';
    publish.addEventListener('click', () => moderateComment(comment.id, 'published'));

    const flag = document.createElement('button');
    flag.type = 'button';
    flag.textContent = 'Flag';
    flag.addEventListener('click', () => moderateComment(comment.id, 'flagged'));

    const resolve = document.createElement('button');
    resolve.type = 'button';
    resolve.textContent = 'Resolve';
    resolve.addEventListener('click', () => moderateComment(comment.id, 'resolved'));

    actions.append(status, publish, flag, resolve);
    wrapper.append(strong, message, meta, actions);
    container.appendChild(wrapper);
  });
}

function renderAdminStoreControls() {
  const container = document.getElementById('admin-store');
  container.innerHTML = '';
  state.storeItems.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'admin-actions';
    const label = document.createElement('span');
    label.textContent = `${item.name} — ${item.active ? 'Active' : 'Hidden'}`;
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.textContent = 'Toggle';
    toggle.addEventListener('click', () => {
      item.active = !item.active;
      renderStore();
      renderAdminStoreControls();
    });
    row.append(label, toggle);
    container.appendChild(row);
  });
}

function populateServerForm() {
  const form = document.getElementById('server-form');
  form.state.value = state.serverStatus.state;
  form.playersOnline.value = state.serverStatus.playersOnline;
  form.maxPlayers.value = state.serverStatus.maxPlayers;
  form.queueLength.value = state.serverStatus.queueLength;
  form.uptime.value = state.serverStatus.uptime;
  form.lastRestart.value = state.serverStatus.lastRestart;
  form.address.value = state.serverStatus.address;
}

function populateDiscordForm() {
  const form = document.getElementById('discord-form');
  form.guildId.value = state.discordSettings.guildId;
  form.channelId.value = state.discordSettings.channelId;
}

function handleApplicationSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const characterName = String(formData.get('characterName') || '').trim();
  const discord = String(formData.get('discord') || '').trim();
  if (!characterName || !discord) {
    state.applicationFeedback = 'Please provide both a character name and Discord handle.';
    renderFeedback('application-feedback', state.applicationFeedback);
    return;
  }

  const entry = {
    id: `app-${counters.applications++}`,
    role: formData.get('role'),
    characterName,
    discord,
    experience: String(formData.get('experience') || '').trim(),
    availability: String(formData.get('availability') || '').trim(),
    motivation: String(formData.get('motivation') || '').trim(),
    status: 'pending',
    submittedAt: new Date().toISOString()
  };

  state.applications.unshift(entry);
  state.applicationFeedback = 'Application received. A staff member will reach out on Discord once it has been reviewed.';
  renderFeedback('application-feedback', state.applicationFeedback);
  form.reset();

  renderAdminStats();
  renderAdminApplications();
}

function handleSupportSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const subject = String(formData.get('subject') || '').trim();
  if (!subject) {
    state.supportFeedback = 'Please add a subject so the team knows how to help.';
    renderFeedback('support-feedback', state.supportFeedback);
    return;
  }

  const ticket = {
    id: `ticket-${counters.tickets++}`,
    subject,
    user: String(formData.get('contact') || '').trim() || 'Anonymous',
    channel: String(formData.get('channel') || 'Discord'),
    status: 'open',
    createdAt: new Date().toISOString()
  };

  state.supportTickets.unshift(ticket);
  state.supportFeedback = 'Support ticket created. Track updates in your Discord DMs or email.';
  renderFeedback('support-feedback', state.supportFeedback);
  form.reset();

  renderSupportStats();
  renderAdminStats();
  renderAdminTickets();
}

function handleLogin(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const username = String(formData.get('username') || '').trim().toLowerCase();
  const password = formData.get('password');

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    state.adminUser = { username: formData.get('username').trim() };
    form.reset();
    renderAdminPanel();
  } else {
    const error = document.getElementById('login-error');
    error.textContent = 'Invalid credentials. Contact lead staff if you need access.';
    error.hidden = false;
  }
}

function handleLogout() {
  state.adminUser = null;
  renderAdminPanel();
}

function handleServerForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const playersOnlineValue = Number(formData.get('playersOnline'));
  const maxPlayersValue = Number(formData.get('maxPlayers'));
  const queueLengthValue = Number(formData.get('queueLength'));
  state.serverStatus = {
    state: formData.get('state') || state.serverStatus.state,
    playersOnline:
      Number.isFinite(playersOnlineValue) && formData.get('playersOnline') !== ''
        ? playersOnlineValue
        : state.serverStatus.playersOnline,
    maxPlayers:
      Number.isFinite(maxPlayersValue) && formData.get('maxPlayers') !== ''
        ? maxPlayersValue
        : state.serverStatus.maxPlayers,
    queueLength:
      Number.isFinite(queueLengthValue) && formData.get('queueLength') !== ''
        ? queueLengthValue
        : state.serverStatus.queueLength,
    uptime: formData.get('uptime') || state.serverStatus.uptime,
    lastRestart: formData.get('lastRestart') || state.serverStatus.lastRestart,
    address: formData.get('address') || state.serverStatus.address
  };
  renderQueueMetrics();
  renderAdminStats();
}

function handleDiscordForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  state.discordSettings = {
    guildId: formData.get('guildId') || state.discordSettings.guildId,
    channelId: formData.get('channelId') || state.discordSettings.channelId
  };
  renderDiscord();
}

function updateApplicationStatus(id, status) {
  state.applications = state.applications.map((app) =>
    app.id === id
      ? {
          ...app,
          status
        }
      : app
  );
  renderAdminStats();
  renderAdminApplications();
}

function updateTicketStatus(id, status) {
  state.supportTickets = state.supportTickets.map((ticket) =>
    ticket.id === id
      ? {
          ...ticket,
          status
        }
      : ticket
  );
  renderSupportStats();
  renderAdminStats();
  renderAdminTickets();
}

function moderateComment(id, status) {
  state.comments = state.comments.map((comment) =>
    comment.id === id
      ? {
          ...comment,
          status
        }
      : comment
  );
  renderAdminComments();
  renderAdminStats();
}

function handleNewsForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const title = String(formData.get('title') || '').trim();
  if (!title) {
    return;
  }

  const post = {
    id: `news-${counters.news++}`,
    title,
    excerpt: String(formData.get('excerpt') || '').trim() || title,
    body: String(formData.get('body') || '').trim(),
    publishedAt: new Date().toISOString(),
    author: state.adminUser ? `${state.adminUser.username} (Staff)` : 'Staff Team'
  };

  state.news.unshift(post);
  form.reset();
  renderNews();
  renderAdminNews();
}

function handleGalleryForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const url = String(formData.get('url') || '').trim();
  if (!url) {
    return;
  }

  const entry = {
    id: `gallery-${counters.gallery++}`,
    title: String(formData.get('title') || 'New media asset').trim() || 'New media asset',
    type: formData.get('type') || 'image',
    url
  };

  state.gallery.unshift(entry);
  form.reset();
  renderGallery();
  renderAdminGallery();
}

function handleTebexPurchase(event, item) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const username = String(formData.get('username') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const quantity = Number(formData.get('quantity') || 1);

  if (!username) {
    state.purchaseState[item.id] = {
      status: 'error',
      message: 'Character name is required to start a checkout.'
    };
    renderStore();
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_CHECKOUT_QUANTITY) {
    state.purchaseState[item.id] = {
      status: 'error',
      message: `Quantity must be between 1 and ${MAX_CHECKOUT_QUANTITY}.`
    };
    renderStore();
    return;
  }

  if (email && !/^.+@.+\..+$/.test(email)) {
    state.purchaseState[item.id] = {
      status: 'error',
      message: 'Contact email must be valid.'
    };
    renderStore();
    return;
  }

  state.purchaseState[item.id] = { status: 'loading' };
  renderStore();

  const checkoutId = `chk_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const expiresAt = new Date(Date.now() + CHECKOUT_WINDOW_MINUTES * 60 * 1000);
  const params = new URLSearchParams({
    package: String(item.packageId),
    username,
    quantity: String(quantity)
  });
  if (email) {
    params.set('email', email);
  }
  const redirectUrl = `${DEFAULT_TEBEX_BASE.replace(/\/$/, '')}/checkout/${checkoutId}?${params.toString()}`;

  state.purchaseState[item.id] = {
    status: 'success',
    message: `Checkout created. Expires ${formatDate(expiresAt)}`,
    redirectUrl
  };
  renderStore();
}

function handleFilterChange(event) {
  state.adminFilters.applicationRole = event.target.value;
  renderAdminApplications();
}

function init() {
  renderHero();
  renderJoinSteps();
  renderRules();
  renderNews();
  renderJobs();
  renderGallery();
  renderApplicationRoles();
  renderQueueMetrics();
  renderStore();
  renderDiscord();
  renderSupportStats();
  renderAdminPanel();

  document.getElementById('application-form').addEventListener('submit', handleApplicationSubmit);
  document.getElementById('support-form').addEventListener('submit', handleSupportSubmit);
  document.getElementById('login-form').addEventListener('submit', handleLogin);
  document.getElementById('logout-button').addEventListener('click', handleLogout);
  document.getElementById('server-form').addEventListener('submit', handleServerForm);
  document.getElementById('discord-form').addEventListener('submit', handleDiscordForm);
  document.getElementById('news-form').addEventListener('submit', handleNewsForm);
  document.getElementById('gallery-form').addEventListener('submit', handleGalleryForm);
  document.getElementById('admin-app-filter').addEventListener('change', handleFilterChange);

  setInterval(renderQueueMetrics, 60 * 1000);
}

init();
