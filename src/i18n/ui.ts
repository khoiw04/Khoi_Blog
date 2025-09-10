export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const defaultLang = 'vi';

export const ui = {
  vi: {
    'nav.home': 'Trang chủ',
    'nav.blog': 'Bài Viết',
    'nav.about': 'Về Tôi',
    'nav.nagivateBack': 'Quay lại',
    'searchCMD.placeholder': 'Tìm thông tin...',
    'searchCMD.empty': 'Không thấy thông tin.',
    'searchCMD.heading.code': 'Lập Trình',
    'searchCMD.heading.post': 'Bài Viết',
    'tagPost.noFound': 'Không có bài viết nào với tag này.',
    'tagPost.total.1': 'Tổng cộng:',
    'tagPost.total.2': 'bài viết.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.nagivateBack': 'Back',
    'searchCMD.placeholder': 'Search Result...',
    'searchCMD.empty': 'No found.',
    'searchCMD.heading.code': 'Develops',
    'searchCMD.heading.post': 'Posts',
    'tagPost.noFound': 'No posts found with this tag.',
    'tagPost.total.1': 'Total:',
    'tagPost.total.2': 'posts.',
  },
} as const;