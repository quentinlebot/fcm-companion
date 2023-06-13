export class Utils {
    static getMilestoneDisplay(milestone: string) {
        switch (milestone) {
            case 'burger':
                return 'First burger marketed';
            case 'pizza':
                return 'First pizza marketed';
            case 'drink':
                return 'First drink marketed';
            case 'lowerPrice':
                return 'First to lower prices';
            case 'ketchup':
                return 'Someone sells your demand';
            default:
                return '';
        }
    }
}