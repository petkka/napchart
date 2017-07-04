import { connect } from 'react-redux'
import Stats from '../components/Stats.jsx'

const mapStateToProps = ({present}) => {
  return {
    elements: present.elements,
    types: present.types
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTypeUpdate: (type) => {
      dispatch(editType(type))
    },
    onDeleteType: (id, elements) => {
      dispatch(deleteElementsWithType(elements, id))
      dispatch(deleteType(id))
    },
    onCreateType: (type, types) => {
      dispatch(createType(types, type.name))
    },
    onCreateElement: (elements, type) => {
      console.log(type)
      dispatch(createElement(elements, type))
    },
  }
}

const StatsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats)

export default StatsContainer
