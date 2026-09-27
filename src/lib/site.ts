export type Lang = 'zh' | 'en';
export type Section = 'home' | 'projects' | 'blog' | 'about';

export const site = {
  url: 'https://lkrr1213.github.io',
  email: 'lkrr1213@163.com',
  github: 'https://github.com/lkrr1213',
  name: { zh: '李昆蓉', en: 'Kunrong Li' },
  title: { zh: '李昆蓉｜项目、写作与探索', en: 'Kunrong Li | Projects, Writing & Exploration' },
};

export const copy = {
  zh: {
    nav: { home: '首页', projects: '项目', blog: '文章', about: '关于' },
    skip: '跳到主要内容',
    language: 'English',
    missingLanguage: '暂无英文版本',
    heroTitle: '你好，我是李昆蓉。',
    heroBody: '北京工业大学物联网工程本科在读，参与 Agent 应用、自动化工具与机器人研究。在这里记录我的项目、学习与探索。',
    viewProjects: '查看项目',
    aboutMe: '关于我',
    featured: '精选项目',
    recent: '最近文章',
    allProjects: '全部项目',
    allPosts: '全部文章',
    projectsIntro: '从具体问题出发，记录我参与的工作、方法与成果。',
    blogIntro: '关于项目实践、学习与探索的持续记录。',
    contact: '联系',
    contactText: '欢迎通过邮箱或 GitHub 与我交流。',
    emptyPosts: '目前还没有已发布的文章。',
    backProjects: '返回项目列表',
    backPosts: '返回文章列表',
    readProject: '阅读项目',
    readPost: '阅读文章',
    aboutIntro: '我在北京工业大学学习物联网工程，关注 Agent 应用、自动化工具与机器人研究，也持续探索其他技术领域。',
    education: '教育',
    experience: '实习经历',
    skills: '技能与工具',
    community: '社团与研修',
    seeProject: '相关项目',
    notFound: '页面未找到',
    notFoundText: '这个地址没有对应的页面。',
    backHome: '返回中文首页',
  },
  en: {
    nav: { home: 'Home', projects: 'Projects', blog: 'Writing', about: 'About' },
    skip: 'Skip to main content',
    language: '中文',
    missingLanguage: 'Chinese version unavailable',
    heroTitle: 'Hi, I’m Kunrong Li.',
    heroBody: 'I’m an undergraduate studying Internet of Things Engineering at Beijing University of Technology. My work spans agent applications, automation tools, and robotics research. This is where I share my projects, learning, and exploration.',
    viewProjects: 'View projects',
    aboutMe: 'About me',
    featured: 'Featured projects',
    recent: 'Recent writing',
    allProjects: 'All projects',
    allPosts: 'All writing',
    projectsIntro: 'A record of the problems, contributions, approaches, and outcomes in my work.',
    blogIntro: 'Notes on projects, learning, and exploration.',
    contact: 'Contact',
    contactText: 'You are welcome to get in touch by email or GitHub.',
    emptyPosts: 'There are no published articles yet.',
    backProjects: 'Back to projects',
    backPosts: 'Back to writing',
    readProject: 'Read project',
    readPost: 'Read article',
    aboutIntro: 'I study Internet of Things Engineering at Beijing University of Technology. I work across agent applications, automation tools, and robotics research, and continue to explore other areas of technology.',
    education: 'Education',
    experience: 'Experience',
    skills: 'Skills and tools',
    community: 'Community and study',
    seeProject: 'Related project',
    notFound: 'Page not found',
    notFoundText: 'There is no page at this address.',
    backHome: 'Back to English home',
  },
} as const;

export function path(lang: Lang, section: Section, slug?: string) {
  const prefix = lang === 'en' ? '/en' : '';
  const part = section === 'home' ? '' : section;
  return `${prefix}/${part}${slug ? `/${slug}` : ''}/`.replace(/\/\//g, '/');
}

export function absolute(pathname: string) {
  return new URL(pathname, site.url).toString();
}
