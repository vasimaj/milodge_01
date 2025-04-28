import { ThemeSettings, useThemeContext } from '@/common'
import {
  Activity,
  Applications,
  DarkLight,
  Helpdesk,
  Languages,
  Notifications,
  Profile,
  Search,
  useThemeCustomizer,
} from '@/components'
import Logo from '@/components/Common/Logo'
import { useViewport } from '@/hooks'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MegaMenu from './MegaMenu'

type HeaderProps = {
  toggleMenu?: () => void
  navOpen?: boolean
}

const Header = ({ toggleMenu, navOpen }: HeaderProps) => {
  const { width } = useViewport()
  const { sidenavType } = useThemeCustomizer()
  const { updateSidebar } = useThemeContext()
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)

  function handleMegaMenuClick() {
    setMegaMenuOpen(!megaMenuOpen)
    if (!megaMenuOpen) {
      document.body.classList.add('megamenu-open')
      showBackdrop()
    } else {
      document.body.classList.remove('megamenu-open')
      hideBackdrop()
    }
  }

  function showBackdrop() {
    const backdrop = document.createElement('div')
    backdrop.id = 'megaMenuBackdrop'
    backdrop.className = 'offcanvas-backdrop fade show z-1030'
    document.body.appendChild(backdrop)

    backdrop.addEventListener('click', handleBackdropClick)
  }

  function hideBackdrop() {
    const backdrop = document.getElementById('megaMenuBackdrop')
    if (backdrop) {
      backdrop.removeEventListener('click', handleBackdropClick)
      document.body.removeChild(backdrop)
    }
  }

  function handleBackdropClick() {
    setMegaMenuOpen(false)
    document.body.classList.remove('megamenu-open')
    hideBackdrop()
  }

  const handleLeftMenuCallBack = () => {
    if (width < 768) {
      if (sidenavType === 'full') {
        showLeftSideBarBackdrop()
        document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
      } else {
        updateSidebar({ size: ThemeSettings.sidebar.size.full })
      }
    } else if (sidenavType === 'iconbar') {
      updateSidebar({ size: ThemeSettings.sidebar.size.default })
    } else if (sidenavType === 'full') {
      showLeftSideBarBackdrop()
      document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
    } else if (sidenavType === 'fullscreen') {
      updateSidebar({ size: ThemeSettings.sidebar.size.default })
      document.getElementsByTagName('html')[0].classList.add('sidebar-enable')
    } else {
      updateSidebar({ size: ThemeSettings.sidebar.size.iconbar })
    }
  }

  function showLeftSideBarBackdrop() {
    const backdrop = document.createElement('div')
    backdrop.id = 'custom-backdrop'
    backdrop.className = 'offcanvas-backdrop fade show'
    document.body.appendChild(backdrop)

    backdrop.addEventListener('click', function () {
      document.getElementsByTagName('html')[0].classList.remove('sidebar-enable')
      hideLeftSideBarBackdrop()
    })
  }

  function hideLeftSideBarBackdrop() {
    const backdrop = document.getElementById('custom-backdrop')
    if (backdrop) {
      document.body.removeChild(backdrop)
      document.body.style.removeProperty('overflow')
    }
  }

  return (
    <>
      <header className="header-navbar">
        <div className="header-inner px-2 px-md-3">
          {/* header-left */}
          <div className="header-left d-flex align-items-center">
            <Link to="/">
              <Logo />
            </Link>
            <div className="button-toggle-menu">
              <button className="header-btn" onClick={handleLeftMenuCallBack}>
                <i className="fi fi-rr-menu-burger"></i>
              </button>
            </div>
            <button
              className={`navbar-toggle ${navOpen ? 'open' : ''}`}
              data-bs-toggle="collapse"
              data-bs-target="#topnav-menu-content"
              onClick={toggleMenu}
            >
              <div className="lines">
                <span />
                <span />
                <span />
              </div>
            </button>
            <MegaMenu />
          </div>
          {/* header-right */}
          <div className="header-right d-flex align-items-center justify-content-center">
            <Search />
            <DarkLight />
            <Languages />
            <span className="d-none d-sm-flex">
              <Activity />
              <Helpdesk />
              <Applications />
            </span>
            <Notifications />
            <Profile />
            <div className="header-btn pe-md-0 d-lg-none" onClick={handleMegaMenuClick}>
              <i className="fi fi-rr-menu-burger"></i>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
