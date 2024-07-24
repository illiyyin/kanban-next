'use client'
import Link from 'next/link'
import type { CSSProperties } from '@/types'
import { usePathname } from 'next/navigation'

const SideMenu = (): JSX.Element => {
  const pathname = usePathname()
  return (
    <div style={styles.container}>
      <Link href="/" style={pathname === '/' ? styles.activeLink : styles.link}>
        <span className="material-icons" style={styles.icon}>
          home
        </span>
        <p style={styles.text}>Home</p>
      </Link>
      <Link href="/task-list" style={pathname === '/task-list' ? styles.activeLink : styles.link}>
        <span className="material-icons" style={styles.icon}>
          list
        </span>
        <p style={styles.text}>Task List</p>
      </Link>
      <Link
        href="/task-progress"
        style={pathname === '/task-progress' ? styles.activeLink : styles.link}
      >
        <span className="material-icons" style={styles.icon}>
          check_box
        </span>
        <p style={styles.text}>Task Progress</p>
      </Link>
    </div>
  )
}

const commonLinkStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  margin: '12px 0',
  textDecoration: 'none',
}

const styles: CSSProperties = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#55ACC8',
    padding: '20px',
    minHeight: '100vh',
    height: '100%',
  },
  link: {
    ...commonLinkStyles,
    color: '#fff',
  },
  activeLink: {
    ...commonLinkStyles,
    color: '#255261',
  },
  icon: {
    fontSize: '40px',
  },
  text: {
    fontSize: '24px',
    marginLeft: '8px',
  },
}

export default SideMenu
