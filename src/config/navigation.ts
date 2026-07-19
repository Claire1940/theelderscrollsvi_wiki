import {
	BookOpen,
	CalendarClock,
	Clapperboard,
	Cpu,
	Eye,
	Map,
	MonitorSmartphone,
	Swords,
	type LucideIcon,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'release' -> t('nav.release')
	path: string // URL 路径，如 '/release'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

// 导航配置：基于 The Elder Scrolls VI 实际文章分类（8 个）
// 顺序按玩家关注热度排列，每个分类使用不同的 Lucide 图标
export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: CalendarClock, isContentType: true },
	{ key: 'setting', path: '/setting', icon: Map, isContentType: true },
	{ key: 'platforms', path: '/platforms', icon: MonitorSmartphone, isContentType: true },
	{ key: 'features', path: '/features', icon: Swords, isContentType: true },
	{ key: 'development', path: '/development', icon: Cpu, isContentType: true },
	{ key: 'trailers', path: '/trailers', icon: Clapperboard, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'rumors', path: '/rumors', icon: Eye, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1), // 移除开头的 '/'
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
