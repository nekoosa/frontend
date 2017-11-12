<script>
  let baseOptions = {
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function() {
      return {
        firstName: 'extendWalter',
        lastName: 'extendWhite',
        alias: 'extendHeisenberg'
      }
    },
    methods: {
      output() {
        console.log('base output')
      }
    },
    created() {
      console.log('onCreated-1')
    }
  }
  let testMixin = {
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function() {
      return {
        firstName: 'testWalter',
        lastName: 'testWhite',
        alias: 'testHeisenberg'
      }
    },
    methods: {
      output() {
        console.log('test output')
      }
    },
    created() {
      console.log('onCreated-testMixin')
    }
  }
  export default {
    extends: baseOptions,
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function() {
      return {
        firstName: 'mainWalter',
        lastName: 'mainWhite',
        alias: 'mainHeisenberg'
      }
    },
    methods: {
      output() {
        console.log('main output')
      }
    },
    created() {
      console.log('onCreated-main')
      this.output()
    },
    mixins: [testMixin]
  }
</script>