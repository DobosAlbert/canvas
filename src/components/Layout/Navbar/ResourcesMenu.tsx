import { Nav, NavItem } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWheatAwn } from '@fortawesome/free-solid-svg-icons'

const resourcesList = [
    {
        name: "RES1",
        icon: <FontAwesomeIcon icon={faWheatAwn} />
    },
    {
        name: "RES2",
        icon: <FontAwesomeIcon icon={faWheatAwn} />
    },
    {
        name: "RES3",
        icon: <FontAwesomeIcon icon={faWheatAwn} />
    },
    {
        name: "RES4",
        icon: <FontAwesomeIcon icon={faWheatAwn} />
    },
    {
        name: "RES5",
        icon: <FontAwesomeIcon icon={faWheatAwn} />
    },
    {
        name: "RES6",
        icon: <FontAwesomeIcon icon={faWheatAwn} />
    }
]

export const ResourcesMenu = () => {
  return (
    <Nav className='d-block mx-auto d-sm-flex mx-sm-0 justify-content-center align-items-center mt-3'>
        {resourcesList.map((resource, index) => (
          <ResourceItem
            key={resource.name + index}
            resource={resource}
          />
        ))}
      </Nav>
  )
}

export const ResourceItem = ({resource}: {resource: {name: string, icon: any}}) => {
    return (
          <NavItem
              key={resource.name}
              className={'mb-3 mb-sm-0 mr-0 mr-sm-4'}
            >
                {resource.icon}<span className='ml-3'>{resource.name}</span>
            </NavItem>
    )
  }
