import { getOwner } from 'discourse-common/lib/get-owner';
import Category from 'discourse/models/category';

export default {
  setupComponent(attrs, component) {
    const buffered = this.get('buffered');
    const user = component.currentUser;
    const showEventControls = (category) => {
      return category && category.events_enabled && (
        user.staff ||
        user.trust_level >= category.events_min_trust_to_create
      );
    }
    component.set('showEventControls', showEventControls(buffered.get('category')))
    buffered.addObserver('category_id', () => {
      if (this._state === 'destroying') return;
      let category = Category.findById(this.get('buffered.category_id'));
      component.set('showEventControls', showEventControls(category));
    })
  }
}
